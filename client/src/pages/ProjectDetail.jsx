import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiTag, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { getCategoryLabel } from '../utils/categoryLabels';
import { getLocalizedText } from '../utils/localization';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const copy = language === 'en'
    ? {
        loading: 'Loading project details...',
        notFoundTitle: 'Project Not Found',
        notFoundDescription: "The project you're looking for doesn't exist.",
        backToProjects: 'Back to Projects',
        back: 'Back',
        client: 'Client',
        year: 'Year',
        visitWebsite: 'Visit Website',
        videos: 'Project Videos',
        technologies: 'Technologies Used',
        ctaTitle: 'Interested in a Similar Project?',
        ctaDescription: "Let's discuss how we can bring your vision to life with our expertise.",
        ctaButton: 'Start Your Project'
      }
    : {
        loading: 'جارٍ تحميل تفاصيل المشروع...',
        notFoundTitle: 'المشروع غير موجود',
        notFoundDescription: 'المشروع الذي تبحث عنه غير متاح.',
        backToProjects: 'العودة للمشاريع',
        back: 'رجوع',
        client: 'العميل',
        year: 'السنة',
        visitWebsite: 'زيارة الموقع',
        videos: 'فيديوهات المشروع',
        technologies: 'التقنيات المستخدمة',
        ctaTitle: 'مهتم بمشروع مماثل؟',
        ctaDescription: 'دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع بخبرتنا.',
        ctaButton: 'ابدأ مشروعك'
      };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err.userMessage || err.message);
        setError('project-not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const nextImage = () => {
    if (project?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="spinner"></div>
        <p>{copy.loading}</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail-error">
        <h2>{copy.notFoundTitle}</h2>
        <p>{copy.notFoundDescription}</p>
        <Link to="/projects" className="btn btn-primary">
          <FiArrowLeft /> {copy.backToProjects}
        </Link>
      </div>
    );
  }

  const title = getLocalizedText(project.title, language, 'Project');
  const description = getLocalizedText(project.description, language);
  const categoryLabel = getCategoryLabel(project.category, language);
  const clientName =
    typeof project.client === 'object'
      ? getLocalizedText(project.client, language)
      : String(project.client || '');

  return (
    <div className="project-detail">
      <div className="container">
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FiArrowLeft /> {copy.back}
        </motion.button>

        <motion.div
          className="project-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="project-header-content">
            <span className="project-category">{categoryLabel}</span>
            <h1>{title}</h1>
            <p className="project-description">{description}</p>
          </div>

          <div className="project-meta">
            <div className="meta-item">
              <FiUser />
              <div>
                <strong>{copy.client}</strong>
                <p>{clientName}</p>
              </div>
            </div>
            {project.createdAt && (
              <div className="meta-item">
                <FiCalendar />
                <div>
                  <strong>{copy.year}</strong>
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
                <FiExternalLink /> {copy.visitWebsite}
              </a>
            )}
          </div>
        </motion.div>

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
                  alt={`${title} - ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav gallery-prev"
                    onClick={prevImage}
                    aria-label={language === 'en' ? 'Previous image' : 'الصورة السابقة'}
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav gallery-next"
                    onClick={nextImage}
                    aria-label={language === 'en' ? 'Next image' : 'الصورة التالية'}
                  >
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
                    type="button"
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={
                      language === 'en'
                        ? `Show image ${index + 1}`
                        : `عرض الصورة ${index + 1}`
                    }
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {project.videos && project.videos.length > 0 && (
          <motion.div
            className="project-videos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>{copy.videos}</h2>
            <div className="videos-grid">
              {project.videos.map((video, index) => (
                <div key={index} className="video-wrapper">
                  <iframe
                    src={video}
                    title={`${title} Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {project.tags && project.tags.length > 0 && (
          <motion.div
            className="project-tags-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>
              <FiTag /> {copy.technologies}
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

        <motion.div
          className="project-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>{copy.ctaTitle}</h2>
          <p>{copy.ctaDescription}</p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            {copy.ctaButton}
          </Link>
        </motion.div>

        <div className="project-mobile-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            {copy.back}
          </button>
          <Link to="/contact" className="btn btn-primary">
            {copy.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
