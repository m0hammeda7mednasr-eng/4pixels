import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { 
  FiGrid, FiFolder, FiMessageSquare, 
  FiEdit2, FiTrash2, 
  FiPlus, FiX, FiSave, FiEye, FiDollarSign,
  FiClock, FiCheck, FiSearch
} from 'react-icons/fi';
import api from '../services/api';
import './Admin.css';

const Admin = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        setLoading(false);
        return;
      }
      
      const [servicesRes, projectsRes, messagesRes, reviewsRes] = await Promise.all([
        api.get('/services').catch(err => ({ data: [] })),
        api.get('/projects').catch(err => ({ data: [] })),
        api.get('/messages').catch(err => ({ data: [] })),
        api.get('/reviews/admin/all').catch(err => ({ data: [] }))
      ]);
      
      setServices(servicesRes.data || []);
      setProjects(projectsRes.data || []);
      setMessages(messagesRes.data || []);
      setReviews(reviewsRes.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      await api.delete(`/${type}/${id}`);
      toast.success(`${type} deleted successfully`);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  if (!isAdmin()) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const stats = {
    services: services.length,
    projects: projects.length,
    unreadMessages: messages.filter(m => !m.read).length,
    totalMessages: messages.length,
    reviews: reviews.length,
    activeReviews: reviews.filter(r => r.active).length,
    revenue: services.reduce((sum, s) => sum + (s.price || 0), 0)
  };

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>4Pixels Admin</h2>
          <p>Dashboard</p>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            <FiGrid /> Overview
          </button>
          <button 
            className={activeTab === 'services' ? 'active' : ''} 
            onClick={() => setActiveTab('services')}
          >
            <FiGrid /> Services
            <span className="count">{stats.services}</span>
          </button>
          <button 
            className={activeTab === 'projects' ? 'active' : ''} 
            onClick={() => setActiveTab('projects')}
          >
            <FiFolder /> Projects
            <span className="count">{stats.projects}</span>
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''} 
            onClick={() => setActiveTab('reviews')}
          >
            <FiCheck /> Reviews
            <span className="count">{stats.activeReviews}</span>
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''} 
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare /> Messages
            {stats.unreadMessages > 0 && <span className="badge">{stats.unreadMessages}</span>}
          </button>
        </nav>
      </div>

      <div className="admin-main">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab stats={stats} services={services} messages={messages} reviews={reviews} />
          )}
          
          {activeTab === 'services' && (
            <ServicesTab 
              services={services} 
              onEdit={(item) => openModal('service', item)}
              onDelete={(id) => deleteItem('services', id)}
              onAdd={() => openModal('service')}
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={projects} 
              onEdit={(item) => openModal('project', item)}
              onDelete={(id) => deleteItem('projects', id)}
              onAdd={() => openModal('project')}
            />
          )}
          
          {activeTab === 'reviews' && (
            <ReviewsTab 
              reviews={reviews} 
              onEdit={(item) => openModal('review', item)}
              onDelete={(id) => deleteItem('reviews', id)}
              onAdd={() => openModal('review')}
              onToggle={async (id) => {
                try {
                  await api.patch(`/reviews/${id}/toggle`);
                  toast.success('Review status updated');
                  fetchData();
                } catch (err) {
                  toast.error('Failed to update review');
                }
              }}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessagesTab messages={messages} fetchData={fetchData} onDelete={(id) => deleteItem('messages', id)} />
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <Modal 
          type={modalType} 
          item={editingItem} 
          onClose={closeModal}
          onSave={() => { closeModal(); fetchData(); }}
        />
      )}
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, services, messages, reviews }) => {
  const recentMessages = messages.slice(0, 5);
  const recentReviews = reviews.filter(r => r.active).slice(0, 3);
  
  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your business.</p>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FiGrid />
          </div>
          <div className="stat-info">
            <h3>{stats.services}</h3>
            <p>Active Services</p>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <FiFolder />
          </div>
          <div className="stat-info">
            <h3>{stats.projects}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <FiMessageSquare />
          </div>
          <div className="stat-info">
            <h3>{stats.unreadMessages}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">
            <FiCheck />
          </div>
          <div className="stat-info">
            <h3>{stats.activeReviews}</h3>
            <p>Active Reviews</p>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-header">
            <h3>Recent Messages</h3>
            <FiMessageSquare />
          </div>
          <div className="messages-preview">
            {recentMessages.length > 0 ? (
              recentMessages.map(msg => (
                <div key={msg.id} className={`message-preview ${msg.read ? 'read' : 'unread'}`}>
                  <div className="message-preview-header">
                    <strong>{msg.name}</strong>
                    <span className="time">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{msg.message.substring(0, 60)}...</p>
                </div>
              ))
            ) : (
              <p className="empty-state">No messages yet</p>
            )}
          </div>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <h3>Recent Reviews</h3>
            <FiCheck />
          </div>
          <div className="services-preview">
            {recentReviews.length > 0 ? (
              recentReviews.map(review => (
                <div key={review.id} className="service-preview">
                  <div>
                    <strong>{review.name.en}</strong>
                    <p>{'★'.repeat(review.rating || 5)}</p>
                  </div>
                  <span className="delivery-time">
                    {review.verified && '✓ Verified'}
                  </span>
                </div>
              ))
            ) : (
              <p className="empty-state">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Services Tab Component
const ServicesTab = ({ services, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServices = services.filter(s => 
    s.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.title.ar.includes(searchTerm)
  );

  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <div>
          <h1>Services Management</h1>
          <p>Manage your service offerings</p>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <FiPlus /> Add Service
        </button>
      </div>

      <div className="search-bar">
        <FiSearch />
        <input 
          type="text" 
          placeholder="Search services..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="cards-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-card-header">
              <h3>{service.title.en}</h3>
              <div className="card-actions">
                <button className="btn-icon" onClick={() => onEdit(service)}>
                  <FiEdit2 />
                </button>
                <button className="btn-icon danger" onClick={() => onDelete(service.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="service-description">{service.description.en}</p>
            {service.category && (
              <div className="service-category">
                <span className="category-badge">{service.category}</span>
              </div>
            )}
            <div className="service-meta">
              <span className="price">
                <FiDollarSign /> ${service.price}
              </span>
              <span className="delivery">
                <FiClock /> {service.deliveryTime}
              </span>
            </div>
            <div className="service-features">
              {service.features.en.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="feature-tag">
                  <FiCheck /> {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Projects Tab Component  
const ProjectsTab = ({ projects, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <div>
          <h1>Projects Management</h1>
          <p>Showcase your portfolio</p>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-bar">
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.images?.[0] || 'https://via.placeholder.com/400x300'} alt={project.title.en} />
              <div className="project-overlay">
                <button className="btn-icon" onClick={() => onEdit(project)}>
                  <FiEdit2 />
                </button>
                <button className="btn-icon danger" onClick={() => onDelete(project.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3>{project.title.en}</h3>
              <p>{project.description?.en?.substring(0, 80)}...</p>
              <div className="project-meta">
                <span>Client: {project.client?.en || project.client}</span>
                <span>{project.createdAt ? new Date(project.createdAt).getFullYear() : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Messages Tab Component
const MessagesTab = ({ messages, fetchData, onDelete }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  const markAsRead = async (id) => {
    try {
      await api.patch(`/messages/${id}/read`);
      toast.success('Message marked as read');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    }
  };

  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <div>
          <h1>Messages Inbox</h1>
          <p>Customer inquiries and feedback</p>
        </div>
        <div className="message-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({messages.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({messages.filter(m => m.read).length})
          </button>
        </div>
      </div>
      
      <div className="messages-list">
        {filteredMessages.map(msg => (
          <div key={msg.id} className={`message-card ${msg.read ? 'read' : 'unread'}`}>
            <div className="message-header">
              <div className="message-sender">
                <h3>{msg.name}</h3>
                <p>{msg.email} • {msg.phone}</p>
              </div>
              <div className="message-actions">
                {!msg.read && (
                  <button className="btn-sm" onClick={() => markAsRead(msg.id)}>
                    <FiEye /> Mark as Read
                  </button>
                )}
                <button className="btn-icon danger" onClick={() => onDelete(msg.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="message-body">
              <div className="message-details">
                <span><strong>Company:</strong> {msg.company}</span>
                <span><strong>Service:</strong> {msg.service}</span>
              </div>
              <p className="message-text">{msg.message}</p>
            </div>
            <div className="message-footer">
              <span className="message-time">
                <FiClock /> {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Reviews Tab Component
const ReviewsTab = ({ reviews, onEdit, onDelete, onAdd, onToggle }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredReviews = reviews.filter(r => {
    if (filter === 'active') return r.active;
    if (filter === 'inactive') return !r.active;
    return true;
  });

  return (
    <motion.div 
      className="admin-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="content-header">
        <div>
          <h1>Reviews Management</h1>
          <p>Manage customer testimonials</p>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <FiPlus /> Add Review
        </button>
      </div>

      <div className="filters-bar">
        <div className="category-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({reviews.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({reviews.filter(r => r.active).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive ({reviews.filter(r => !r.active).length})
          </button>
        </div>
      </div>
      
      <div className="reviews-grid">
        {filteredReviews.map(review => (
          <div key={review.id} className={`review-admin-card ${!review.active ? 'inactive' : ''}`}>
            <div className="review-admin-image">
              <img src={review.image} alt={review.name.en} />
              <div className="review-stars">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <div className="review-admin-content">
              <div className="review-admin-header">
                <div>
                  <h3>{review.name.en}</h3>
                  <p className="review-name-ar">{review.name.ar}</p>
                </div>
                {review.verified && <span className="verified-badge-admin">✓ Verified</span>}
              </div>
              <p className="review-text-preview">{review.text.en.substring(0, 100)}...</p>
              <div className="review-admin-actions">
                <button 
                  className={`btn-sm ${review.active ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => onToggle(review.id)}
                >
                  {review.active ? 'Deactivate' : 'Activate'}
                </button>
                <button className="btn-icon" onClick={() => onEdit(review)}>
                  <FiEdit2 />
                </button>
                <button className="btn-icon danger" onClick={() => onDelete(review.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Modal Component
const Modal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item || {
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    name: { en: '', ar: '' },
    text: { en: '', ar: '' },
    price: 0,
    deliveryTime: '',
    features: { en: [], ar: [] },
    rating: 5,
    image: '',
    images: [],
    category: '',
    active: true
  });
  const [newFeatureEn, setNewFeatureEn] = useState('');
  const [newFeatureAr, setNewFeatureAr] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(item?.images || []);

  // Categories للـ Projects
  const projectCategories = [
    'Web Development',
    'Mobile App',
    'E-Commerce',
    'Digital Marketing',
    'UI/UX Design',
    'Branding',
    'SEO',
    'Custom Software'
  ];

  // Categories للـ Services
  const serviceCategories = [
    'Web Development',
    'Mobile Development',
    'Digital Marketing',
    'Design Services',
    'SEO Services',
    'Consulting',
    'E-Commerce Solutions',
    'Other Services'
  ];

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data with images
      const dataToSend = {
        ...formData,
        images: imagePreviews // Use base64 images for now
      };

      if (item) {
        await api.put(`/${type}s/${item.id}`, dataToSend);
        toast.success(`${type} updated successfully`);
      } else {
        await api.post(`/${type}s`, dataToSend);
        toast.success(`${type} created successfully`);
      }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  const addFeature = () => {
    if (newFeatureEn && newFeatureAr) {
      setFormData({
        ...formData,
        features: {
          en: [...(formData.features?.en || []), newFeatureEn],
          ar: [...(formData.features?.ar || []), newFeatureAr]
        }
      });
      setNewFeatureEn('');
      setNewFeatureAr('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: {
        en: formData.features.en.filter((_, i) => i !== index),
        ar: formData.features.ar.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{item ? 'Edit' : 'Add'} {type}</h2>
          <button className="btn-icon" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          {type === 'review' ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Name (English)</label>
                  <input 
                    type="text" 
                    value={formData.name?.en || ''}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Name (Arabic)</label>
                  <input 
                    type="text" 
                    value={formData.name?.ar || ''}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, ar: e.target.value}})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Review Text (English)</label>
                  <textarea 
                    value={formData.text?.en || ''}
                    onChange={(e) => setFormData({...formData, text: {...formData.text, en: e.target.value}})}
                    rows="4"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Review Text (Arabic)</label>
                  <textarea 
                    value={formData.text?.ar || ''}
                    onChange={(e) => setFormData({...formData, text: {...formData.text, ar: e.target.value}})}
                    rows="4"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Customer Image</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({...formData, image: reader.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '2px solid var(--admin-border)',
                      background: 'var(--admin-bg)',
                      color: 'var(--admin-text)',
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  />
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginTop: '10px',
                        border: '2px solid var(--admin-border)'
                      }}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="5"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Title (English)</label>
                  <input 
                    type="text" 
                    value={formData.title?.en || ''}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Title (Arabic)</label>
                  <input 
                    type="text" 
                    value={formData.title?.ar || ''}
                    onChange={(e) => setFormData({...formData, title: {...formData.title, ar: e.target.value}})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea 
                    value={formData.description?.en || ''}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description (Arabic)</label>
                  <textarea 
                    value={formData.description?.ar || ''}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
                    rows="3"
                    required
                  />
                </div>
              </div>

              {type === 'service' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '2px solid var(--admin-border)',
                          background: 'var(--admin-bg)',
                          color: 'var(--admin-text)',
                          fontSize: '0.95rem',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">Select Category</option>
                        {serviceCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price ($)</label>
                      <input 
                        type="number" 
                        value={formData.price || 0}
                        onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Delivery Time</label>
                    <input 
                      type="text" 
                      value={formData.deliveryTime || ''}
                      onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                      placeholder="e.g., 2-4 weeks"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Service Image (Optional)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, image: reader.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '2px solid var(--admin-border)',
                        background: 'var(--admin-bg)',
                        color: 'var(--admin-text)',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    />
                    {formData.image && (
                      <img 
                        src={formData.image} 
                        alt="Preview"
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginTop: '10px',
                          border: '2px solid var(--admin-border)'
                        }}
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label>Features</label>
                    <div className="features-list">
                      {formData.features?.en?.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <span>{feature}</span>
                          <button type="button" onClick={() => removeFeature(idx)}>
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="add-feature">
                      <input 
                        type="text" 
                        placeholder="Feature (English)"
                        value={newFeatureEn}
                        onChange={(e) => setNewFeatureEn(e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="Feature (Arabic)"
                        value={newFeatureAr}
                        onChange={(e) => setNewFeatureAr(e.target.value)}
                      />
                      <button type="button" onClick={addFeature} className="btn-sm">
                        <FiPlus /> Add
                      </button>
                    </div>
                  </div>
                </>
              )}

              {type === 'project' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '2px solid var(--admin-border)',
                          background: 'var(--admin-bg)',
                          color: 'var(--admin-text)',
                          fontSize: '0.95rem',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">Select Category</option>
                        {projectCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Client</label>
                      <input 
                        type="text" 
                        value={formData.client || ''}
                        onChange={(e) => setFormData({...formData, client: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Project Images (Multiple)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '2px solid var(--admin-border)',
                        background: 'var(--admin-bg)',
                        color: 'var(--admin-text)',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    />
                    {imagePreviews.length > 0 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '12px',
                        marginTop: '12px'
                      }}>
                        {imagePreviews.map((preview, index) => (
                          <div key={index} style={{
                            position: 'relative',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '2px solid var(--admin-border)'
                          }}>
                            <img 
                              src={preview} 
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '120px',
                                objectFit: 'cover'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'var(--admin-danger)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          
          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              <FiSave /> Save {type}
            </button>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Admin;
