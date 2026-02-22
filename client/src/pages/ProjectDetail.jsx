import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiTag, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail-error">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="btn btn-primary">
          <FiArrowLeft /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="container">
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FiArrowLeft /> {language === 'en' ? 'Back' : 'رجوع'}
        </motion.button>

        {/* Project Header */}
        <motion.div
          className="project-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="project-header-content">
            <span className="project-category">{project.category}</span>
            <h1>{project.title[language]}</h1>
            <p className="project-description">{project.description[language]}</p>
          </div>

          <div className="project-meta">
            <div className="meta-item">
              <FiUser />
              <div>
                <strong>{language === 'en' ? 'Client' : 'العميل'}</strong>
                <p>{typeof project.client === 'object' ? project.client[language] : project.client}</p>
              </div>
            </div>
            {project.createdAt && (
              <div className="meta-item">
                <FiCalendar />
                <div>
                  <strong>{language === 'en' ? 'Year' : 'السنة'}</strong>
                  <p>{new Date(project.createdAt).getFullYear()}</p>
                </div>
              </div>
            )}
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FiExternalLink /> {language === 'en' ? 'Visit Website' : 'زيارة الموقع'}
              </a>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <motion.div
            className="project-gallery"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="gallery-main">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title[language]} - ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button className="gallery-nav gallery-prev" onClick={prevImage}>
                    <FiChevronLeft />
                  </button>
                  <button className="gallery-nav gallery-next" onClick={nextImage}>
                    <FiChevronRight />
                  </button>
                </>
              )}

              <div className="gallery-counter">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>

            {project.images.length > 1 && (
              <div className="gallery-thumbnails">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Video Section */}
        {project.videos && project.videos.length > 0 && (
          <motion.div
            className="project-videos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>{language === 'en' ? 'Project Videos' : 'فيديوهات المشروع'}</h2>
            <div className="videos-grid">
              {project.videos.map((video, index) => (
                <div key={index} className="video-wrapper">
                  <iframe
                    src={video}
                    title={`${project.title[language]} Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags Section */}
        {project.tags && project.tags.length > 0 && (
          <motion.div
            className="project-tags-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>
              <FiTag /> {language === 'en' ? 'Technologies Used' : 'التقنيات المستخدمة'}
            </h2>
            <div className="tags-list">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="project-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>{language === 'en' ? 'Interested in a Similar Project?' : 'مهتم بمشروع مماثل؟'}</h2>
          <p>
            {language === 'en'
              ? 'Let\'s discuss how we can bring your vision to life with our expertise.'
              : 'دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع بخبرتنا.'
            }
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
