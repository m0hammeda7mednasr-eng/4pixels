import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import {
  FiGrid, FiFolder, FiMessageSquare,
  FiEdit2, FiTrash2,
  FiPlus, FiX, FiSave, FiEye, FiDollarSign,
  FiClock, FiCheck, FiSearch, FiChevronDown, FiStar,
  FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import api, { clearApiCache } from '../services/api';
import './Admin.css';
import '../styles/figma-polish.css';

const normalizeBilingualField = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return { en: trimmed, ar: trimmed };
  }

  return {
    en: typeof value?.en === 'string' ? value.en : '',
    ar: typeof value?.ar === 'string' ? value.ar : ''
  };
};

const normalizeStringArray = (value) =>
  (Array.isArray(value) ? value : [])
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);

const Admin = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [activeTab]);

  const fetchData = async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        if (showLoader) {
          setLoading(false);
        }
        return;
      }

      const [servicesRes, projectsRes, messagesRes, reviewsRes, contentRes] = await Promise.all([
        api.get('/services').catch(err => ({ data: [] })),
        api.get('/projects').catch(err => ({ data: [] })),
        api.get('/messages').catch(err => ({ data: [] })),
        api.get('/reviews/admin/all').catch(err => ({ data: [] })),
        api.get('/content').catch(err => ({ data: null }))
      ]);

      setServices(servicesRes.data || []);
      setProjects(projectsRes.data || []);
      setMessages(messagesRes.data || []);
      setReviews(reviewsRes.data || []);
      setContent(contentRes.data || null);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      if (showLoader) {
        setLoading(false);
      }
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
      clearApiCache();
      toast.success(`${type} deleted successfully`);
      fetchData(false);
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
    revenue: services.reduce((sum, s) => sum + (s.price || 0), 0),
    featuredProjects: projects.filter((project) => Boolean(project.featured)).length,
    serviceCategories: new Set(services.map((service) => service.category).filter(Boolean)).size,
    avgReviewRating: reviews.length
      ? Number((reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1))
      : 0
  };

  const navItems = [
    { key: 'overview', label: 'Overview', icon: FiGrid },
    { key: 'services', label: 'Services', icon: FiGrid, count: stats.services },
    { key: 'projects', label: 'Projects', icon: FiFolder, count: stats.projects },
    { key: 'reviews', label: 'Reviews', icon: FiCheck, count: stats.activeReviews },
    { key: 'messages', label: 'Messages', icon: FiMessageSquare, badge: stats.unreadMessages },
    { key: 'content', label: 'Content', icon: FiEdit2 }
  ];

  const activeNavLabel = navItems.find((item) => item.key === activeTab)?.label || 'Navigation';

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>4Pixels Admin</h2>
          <p>Dashboard</p>
        </div>

        <button
          type="button"
          className={`admin-mobile-nav-toggle ${mobileNavOpen ? 'open' : ''}`}
          onClick={() => setMobileNavOpen((prev) => !prev)}
          aria-expanded={mobileNavOpen}
        >
          <span>{activeNavLabel}</span>
          <FiChevronDown />
        </button>

        <nav className={`admin-nav ${mobileNavOpen ? 'open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={activeTab === item.key ? 'active' : ''}
                onClick={() => setActiveTab(item.key)}
              >
                <Icon /> {item.label}
                {typeof item.count === 'number' && <span className="count">{item.count}</span>}
                {item.badge > 0 && <span className="badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="admin-main">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab stats={stats} messages={messages} reviews={reviews} />
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
                  clearApiCache('/reviews');
                  toast.success('Review status updated');
                  fetchData(false);
                } catch (err) {
                  toast.error('Failed to update review');
                }
              }}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesTab messages={messages} fetchData={fetchData} onDelete={(id) => deleteItem('messages', id)} />
          )}

          {activeTab === 'content' && content && (
            <ContentTab content={content} onSave={async (updatedContent) => {
              try {
                const response = await api.put('/content', updatedContent);
                clearApiCache('/content');
                setContent(response.data || updatedContent);
                toast.success('Content updated successfully');
              } catch (err) {
                toast.error('Failed to update content');
              }
            }} />
          )}
        </AnimatePresence>
      </div>

      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={closeModal}
          onSave={() => { clearApiCache(); closeModal(); fetchData(false); }}
        />
      )}
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, messages, reviews }) => {
  const recentMessages = messages.slice(0, 5);
  const recentReviews = reviews.filter(r => r.active).slice(0, 3);
  const readRate = stats.totalMessages > 0
    ? Math.round(((stats.totalMessages - stats.unreadMessages) / stats.totalMessages) * 100)
    : 100;
  const contentReadiness = Math.min(
    100,
    Math.round(
      ((stats.services > 0 ? 30 : 0) +
        (stats.projects > 0 ? 30 : 0) +
        (stats.activeReviews > 0 ? 20 : 0) +
        (stats.totalMessages > 0 ? 20 : 0))
    )
  );

  const insightCards = [
    {
      title: 'Read Rate',
      value: `${readRate}%`,
      caption: `${stats.unreadMessages} unread from ${stats.totalMessages} total messages`,
      meter: readRate,
      icon: <FiMessageSquare />
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects,
      caption: `Portfolio highlights ready for homepage showcase`,
      meter: stats.projects > 0 ? Math.round((stats.featuredProjects / stats.projects) * 100) : 0,
      icon: <FiFolder />
    },
    {
      title: 'Service Categories',
      value: stats.serviceCategories,
      caption: `Category coverage across your service catalog`,
      meter: Math.min(100, stats.serviceCategories * 33),
      icon: <FiGrid />
    },
    {
      title: 'Avg. Review Rating',
      value: stats.avgReviewRating ? `${stats.avgReviewRating}/5` : 'N/A',
      caption: `Active social proof quality for your brand`,
      meter: Math.min(100, Math.round((stats.avgReviewRating / 5) * 100)),
      icon: <FiCheck />
    },
    {
      title: 'Offer Value',
      value: `$${stats.revenue.toLocaleString()}`,
      caption: 'Combined listed value of active services',
      meter: Math.min(100, Math.round(stats.revenue / 120)),
      icon: <FiDollarSign />
    },
    {
      title: 'Content Readiness',
      value: `${contentReadiness}%`,
      caption: 'Overall publishing readiness based on available modules',
      meter: contentReadiness,
      icon: <FiClock />
    }
  ];

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

      <div className="admin-insights-grid">
        {insightCards.map((insight) => (
          <article key={insight.title} className="insight-card">
            <div className="insight-head">
              <span>{insight.title}</span>
              {insight.icon}
            </div>
            <strong className="insight-value">{insight.value}</strong>
            <p>{insight.caption}</p>
            <div className="insight-meter" aria-hidden="true">
              <span style={{ width: `${Math.max(0, Math.min(100, insight.meter))}%` }} />
            </div>
          </article>
        ))}
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
                  <p>{msg.message?.substring(0, 60) || ''}...</p>
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
                    <p className="review-rating">
                      {Array.from({ length: review.rating || 5 }, (_, index) => (
                        <FiStar key={index} />
                      ))}
                    </p>
                  </div>
                  {review.verified && (
                    <span className="delivery-time">
                      <FiCheck />
                      Verified
                    </span>
                  )}
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

  const filteredServices = services.filter((service) => {
    const titleEn = service.title?.en || '';
    const titleAr = service.title?.ar || '';
    const query = searchTerm.toLowerCase();

    return titleEn.toLowerCase().includes(query) || titleAr.includes(searchTerm);
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
              <h3>{service.title?.en || 'Untitled Service'}</h3>
              <div className="card-actions">
                <button className="btn-icon" onClick={() => onEdit(service)}>
                  <FiEdit2 />
                </button>
                <button className="btn-icon danger" onClick={() => onDelete(service.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="service-description">{service.description?.en || 'No description provided'}</p>
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
              {(service.features?.en || []).slice(0, 3).map((feature, idx) => (
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

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = projects.filter(p => {
    const titleEn = p.title?.en || '';
    const titleAr = p.title?.ar || '';
    const matchesSearch =
      titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      titleAr.includes(searchTerm);
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
              <img
                src={project.images?.[0] || 'https://via.placeholder.com/400x300'}
                alt={project.title?.en || 'Project cover'}
              />
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
              <h3>{project.title?.en || 'Untitled Project'}</h3>
              <p>{project.description?.en ? `${project.description.en.substring(0, 80)}...` : 'No description provided'}</p>
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
      clearApiCache('/messages');
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
                <p>{msg.email} | {msg.phone}</p>
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
                  <span key={i}>
                    <FiStar />
                  </span>
                ))}
              </div>
            </div>
            <div className="review-admin-content">
              <div className="review-admin-header">
                <div>
                  <h3>{review.name.en}</h3>
                  <p className="review-name-ar">{review.name.ar}</p>
                </div>
                {review.verified && (
                  <span className="verified-badge-admin">
                    <FiCheck />
                    Verified
                  </span>
                )}
              </div>
              <p className="review-text-preview">{(review.text?.en || '').substring(0, 100)}...</p>
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
let Modal = ({ type, item, onClose, onSave }) => {
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
    'Shopify',
    'Automation',
    'Systems'
  ];

  // Categories للـ Services
  const serviceCategories = [
    'Shopify',
    'Automation',
    'Systems'
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

  const normalizeNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const buildPayload = () => {
    const payload = { ...formData };

    if (type === 'service') {
      payload.price = normalizeNumber(payload.price);
      payload.deliveryTime = (payload.deliveryTime || '').trim();
      payload.features = {
        en: Array.isArray(payload.features?.en) ? payload.features.en.filter(Boolean) : [],
        ar: Array.isArray(payload.features?.ar) ? payload.features.ar.filter(Boolean) : []
      };
      delete payload.images;
    }

    if (type === 'project') {
      payload.images = imagePreviews.filter(Boolean);
    } else {
      delete payload.images;
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = buildPayload();

      if (type === 'service') {
        if (dataToSend.price === null || dataToSend.price < 0) {
          toast.error('Please enter a valid price');
          return;
        }

        if (!dataToSend.deliveryTime) {
          toast.error('Delivery time is required');
          return;
        }
      }

      if (item) {
        await api.put(`/${type}s/${item.id}`, dataToSend);
        toast.success(`${type} updated successfully`);
      } else {
        await api.post(`/${type}s`, dataToSend);
        toast.success(`${type} created successfully`);
      }
      onSave();
    } catch (err) {
      toast.error(err.userMessage || err.response?.data?.message || 'Failed to save');
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
        en: (formData.features?.en || []).filter((_, i) => i !== index),
        ar: (formData.features?.ar || []).filter((_, i) => i !== index)
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
                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Name (Arabic)</label>
                  <input
                    type="text"
                    value={formData.name?.ar || ''}
                    onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Review Text (English)</label>
                  <textarea
                    value={formData.text?.en || ''}
                    onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
                    rows="4"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Review Text (Arabic)</label>
                  <textarea
                    value={formData.text?.ar || ''}
                    onChange={(e) => setFormData({ ...formData, text: { ...formData.text, ar: e.target.value } })}
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
                          setFormData({ ...formData, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="file-input"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="upload-preview upload-preview-sm"
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
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
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
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.title?.ar || ''}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea
                    value={formData.description?.en || ''}
                    onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description (Arabic)</label>
                  <textarea
                    value={formData.description?.ar || ''}
                    onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
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
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="file-input"
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
                        value={formData.price ?? 0}
                        onChange={(e) => {
                          const nextValue = e.target.value;
                          setFormData({
                            ...formData,
                            price: nextValue === '' ? '' : Number(nextValue)
                          });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Delivery Time</label>
                    <input
                      type="text"
                      value={formData.deliveryTime || ''}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
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
                            setFormData({ ...formData, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="file-input"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="upload-preview upload-preview-lg"
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
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="file-input"
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
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
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
                      className="file-input"
                    />
                    {imagePreviews.length > 0 && (
                      <div className="legacy-project-preview-grid">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="legacy-project-preview-card">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="legacy-project-preview-remove"
                            >
                              <FiX />
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

const LegacyModal = Modal;

const ProjectModal = ({ item, onClose, onSave }) => {
  const getInitialProjectData = () => {
    const title = normalizeBilingualField(item?.title);
    const description = normalizeBilingualField(item?.description);
    const client = normalizeBilingualField(item?.client);
    const directImages = normalizeStringArray(item?.images);
    const fallbackImage = typeof item?.image === 'string' ? item.image.trim() : '';

    return {
      title,
      description,
      category: item?.category || '',
      client: {
        en: client.en || '',
        ar: client.ar || ''
      },
      tags: normalizeStringArray(item?.tags || item?.technologies),
      videos: normalizeStringArray(item?.videos),
      externalLink: typeof item?.externalLink === 'string' ? item.externalLink : '',
      featured: Boolean(item?.featured),
      images: directImages.length ? directImages : (fallbackImage ? [fallbackImage] : [])
    };
  };

  const [formData, setFormData] = useState(() => getInitialProjectData());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(getInitialProjectData());
  }, [item]);

  const projectCategories = ['Shopify', 'Automation', 'Systems'];

  const parseListInput = (value) =>
    String(value || '')
      .split(/[\n,]/)
      .map((part) => part.trim())
      .filter(Boolean);

  const serializeListInput = (value) => normalizeStringArray(value).join('\n');

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      return;
    }

    const previews = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
            reader.onerror = () => resolve('');
            reader.readAsDataURL(file);
          })
      )
    );

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...previews.filter(Boolean)]
    }));
    e.target.value = '';
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const moveImage = (index, direction) => {
    setFormData((prev) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= prev.images.length) {
        return prev;
      }

      const nextImages = [...prev.images];
      [nextImages[index], nextImages[nextIndex]] = [nextImages[nextIndex], nextImages[index]];
      return { ...prev, images: nextImages };
    });
  };

  const setCoverImage = (index) => {
    setFormData((prev) => {
      if (index <= 0 || index >= prev.images.length) {
        return prev;
      }

      const nextImages = [...prev.images];
      const [selected] = nextImages.splice(index, 1);
      nextImages.unshift(selected);
      return { ...prev, images: nextImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const payload = {
      title: {
        en: formData.title.en.trim(),
        ar: formData.title.ar.trim()
      },
      description: {
        en: formData.description.en.trim(),
        ar: formData.description.ar.trim()
      },
      category: (formData.category || '').trim(),
      client: {
        en: (formData.client.en || '').trim(),
        ar: (formData.client.ar || '').trim()
      },
      images: normalizeStringArray(formData.images),
      tags: normalizeStringArray(formData.tags),
      videos: normalizeStringArray(formData.videos),
      externalLink: (formData.externalLink || '').trim(),
      featured: Boolean(formData.featured)
    };

    if (!payload.title.en || !payload.title.ar) {
      toast.error('Title is required in English and Arabic');
      return;
    }

    if (!payload.description.en || !payload.description.ar) {
      toast.error('Description is required in English and Arabic');
      return;
    }

    if (!payload.category) {
      toast.error('Project category is required');
      return;
    }

    if (!payload.client.en || !payload.client.ar) {
      toast.error('Client name is required in English and Arabic');
      return;
    }

    if (!payload.images.length) {
      toast.error('Please add at least one project image');
      return;
    }

    if (payload.externalLink) {
      try {
        new URL(payload.externalLink);
      } catch (_err) {
        toast.error('Please enter a valid external link URL');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (item) {
        await api.put(`/projects/${item.id}`, payload);
        toast.success('project updated successfully');
      } else {
        await api.post('/projects', payload);
        toast.success('project created successfully');
      }

      await onSave();
    } catch (err) {
      toast.error(err.userMessage || err.response?.data?.message || 'Failed to save');
    } finally {
      setIsSubmitting(false);
    }
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
          <h2>{item ? 'Edit' : 'Add'} project</h2>
          <button className="btn-icon" onClick={onClose} disabled={isSubmitting}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: { ...prev.title, en: e.target.value }
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Title (Arabic)</label>
              <input
                type="text"
                value={formData.title.ar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: { ...prev.title, ar: e.target.value }
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Description (English)</label>
              <textarea
                rows="3"
                value={formData.description.en}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: { ...prev.description, en: e.target.value }
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description (Arabic)</label>
              <textarea
                rows="3"
                value={formData.description.ar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: { ...prev.description, ar: e.target.value }
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                required
              >
                <option value="">Select Category</option>
                {projectCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group project-featured-toggle">
              <label>Featured Project</label>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={Boolean(formData.featured)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked
                    }))
                  }
                />
                Show this project as featured
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Client (English)</label>
              <input
                type="text"
                value={formData.client.en}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    client: { ...prev.client, en: e.target.value }
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Client (Arabic)</label>
              <input
                type="text"
                value={formData.client.ar}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    client: { ...prev.client, ar: e.target.value }
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>External Link (Optional)</label>
            <input
              type="url"
              value={formData.externalLink}
              placeholder="https://example.com"
              onChange={(e) => setFormData((prev) => ({ ...prev, externalLink: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tags / Technologies</label>
              <textarea
                rows="4"
                value={serializeListInput(formData.tags)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: parseListInput(e.target.value)
                  }))
                }
                placeholder={'Shopify\nAutomation\nCRM'}
              />
            </div>
            <div className="form-group">
              <label>Video URLs (Optional)</label>
              <textarea
                rows="4"
                value={serializeListInput(formData.videos)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    videos: parseListInput(e.target.value)
                  }))
                }
                placeholder={'https://youtube.com/embed/...\nhttps://player.vimeo.com/video/...'}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Images (reorder and set cover)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="file-input"
            />
            <p className="project-list-helper">
              The first image is used as the cover in cards and detail pages.
            </p>
            {formData.images.length > 0 && (
              <div className="project-images-grid">
                {formData.images.map((preview, index) => (
                  <div key={`${preview}-${index}`} className="project-image-preview">
                    {index === 0 && <span className="cover-badge">Cover</span>}
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <div className="project-image-tools">
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <FiArrowUp />
                      </button>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => moveImage(index, 1)}
                        disabled={index === formData.images.length - 1}
                        title="Move down"
                      >
                        <FiArrowDown />
                      </button>
                      <button
                        type="button"
                        className="btn-sm"
                        onClick={() => setCoverImage(index)}
                        disabled={index === 0}
                      >
                        Set as cover
                      </button>
                      <button
                        type="button"
                        className="btn-icon danger"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              <FiSave /> {isSubmitting ? 'Saving...' : 'Save project'}
            </button>
            <button type="button" className="btn-outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

Modal = (props) => {
  if (props.type === 'project') {
    return <ProjectModal item={props.item} onClose={props.onClose} onSave={props.onSave} />;
  }

  return <LegacyModal {...props} />;
};

// Content Tab Component
const ContentTab = ({ content, onSave }) => {
  const [formData, setFormData] = useState(content);
  const [activeSection, setActiveSection] = useState('siteInfo');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      <div className="tab-header">
        <h2>Content Management</h2>
        <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
          <FiSave /> {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="content-sections">
        <div className="section-tabs">
          <button
            className={activeSection === 'siteInfo' ? 'active' : ''}
            onClick={() => setActiveSection('siteInfo')}
          >
            Site Info
          </button>
          <button
            className={activeSection === 'socialMedia' ? 'active' : ''}
            onClick={() => setActiveSection('socialMedia')}
          >
            Social Media
          </button>
          <button
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={() => setActiveSection('hero')}
          >
            Hero Section
          </button>
        </div>

        <div className="section-content">
          {activeSection === 'siteInfo' && (
            <div className="form-section">
              <h3>Site Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Site Name</label>
                  <input
                    type="text"
                    value={formData.siteInfo?.siteName || ''}
                    onChange={(e) => updateSection('siteInfo', 'siteName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    value={formData.siteInfo?.tagline || ''}
                    onChange={(e) => updateSection('siteInfo', 'tagline', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={formData.siteInfo?.description || ''}
                    onChange={(e) => updateSection('siteInfo', 'description', e.target.value)}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.siteInfo?.email || ''}
                    onChange={(e) => updateSection('siteInfo', 'email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={formData.siteInfo?.phone || ''}
                    onChange={(e) => updateSection('siteInfo', 'phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input
                    type="text"
                    value={formData.siteInfo?.whatsapp || ''}
                    onChange={(e) => updateSection('siteInfo', 'whatsapp', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={formData.siteInfo?.address || ''}
                    onChange={(e) => updateSection('siteInfo', 'address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'socialMedia' && (
            <div className="form-section">
              <h3>Social Media Links</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Facebook</label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/yourpage"
                    value={formData.socialMedia?.facebook || ''}
                    onChange={(e) => updateSection('socialMedia', 'facebook', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourpage"
                    value={formData.socialMedia?.instagram || ''}
                    onChange={(e) => updateSection('socialMedia', 'instagram', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/yourpage"
                    value={formData.socialMedia?.twitter || ''}
                    onChange={(e) => updateSection('socialMedia', 'twitter', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/company/yourpage"
                    value={formData.socialMedia?.linkedin || ''}
                    onChange={(e) => updateSection('socialMedia', 'linkedin', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="url"
                    placeholder="https://github.com/yourpage"
                    value={formData.socialMedia?.github || ''}
                    onChange={(e) => updateSection('socialMedia', 'github', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>YouTube</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@yourpage"
                    value={formData.socialMedia?.youtube || ''}
                    onChange={(e) => updateSection('socialMedia', 'youtube', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>TikTok</label>
                  <input
                    type="url"
                    placeholder="https://tiktok.com/@yourpage"
                    value={formData.socialMedia?.tiktok || ''}
                    onChange={(e) => updateSection('socialMedia', 'tiktok', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Behance</label>
                  <input
                    type="url"
                    placeholder="https://behance.net/yourpage"
                    value={formData.socialMedia?.behance || ''}
                    onChange={(e) => updateSection('socialMedia', 'behance', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Dribbble</label>
                  <input
                    type="url"
                    placeholder="https://dribbble.com/yourpage"
                    value={formData.socialMedia?.dribbble || ''}
                    onChange={(e) => updateSection('socialMedia', 'dribbble', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'hero' && (
            <div className="form-section">
              <h3>Hero Section</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title (English)</label>
                  <input
                    type="text"
                    value={formData.hero?.title?.en || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        title: { ...prev.hero.title, en: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="form-group">
                  <label>Title (Arabic)</label>
                  <input
                    type="text"
                    value={formData.hero?.title?.ar || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        title: { ...prev.hero.title, ar: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle (English)</label>
                  <input
                    type="text"
                    value={formData.hero?.subtitle?.en || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        subtitle: { ...prev.hero.subtitle, en: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle (Arabic)</label>
                  <input
                    type="text"
                    value={formData.hero?.subtitle?.ar || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        subtitle: { ...prev.hero.subtitle, ar: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="form-group">
                  <label>CTA Text (English)</label>
                  <input
                    type="text"
                    value={formData.hero?.ctaText?.en || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        ctaText: { ...prev.hero.ctaText, en: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div className="form-group">
                  <label>CTA Text (Arabic)</label>
                  <input
                    type="text"
                    value={formData.hero?.ctaText?.ar || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        ctaText: { ...prev.hero.ctaText, ar: e.target.value }
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
