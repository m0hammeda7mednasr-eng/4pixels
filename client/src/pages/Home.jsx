import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye } from 'react-icons/fi';
import { FaDatabase, FaHubspot, FaNodeJs, FaPython, FaReact, FaRobot, FaShopify } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { getCategoryLabel } from '../utils/categoryLabels';
import './Home.css';

const Home = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, reviewsRes, contentRes] = await Promise.all([
          api.get('/services'),
          api.get('/projects'),
          api.get('/reviews'),
          api.get('/content')
        ]);

        setServices((servicesRes.data || []).slice(0, 3));
        setProjects((projectsRes.data || []).slice(0, 6));
        setReviews((reviewsRes.data || []).slice(0, 6));
        setContent(contentRes.data || null);
      } catch (err) {
        console.error('Error fetching home data:', err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroTitle =
    content?.hero?.title?.[language] ||
    (language === 'en' ? 'Transform Your Digital Vision Into Reality' : 'حوّل رؤيتك الرقمية إلى واقع فعلي');

  const heroSubtitle =
    content?.hero?.subtitle?.[language] ||
    (language === 'en'
      ? 'We craft exceptional digital experiences that drive growth and innovation for forward-thinking businesses.'
      : 'نصمم تجارب رقمية استثنائية تدفع النمو والابتكار للشركات الطموحة.');

  const metrics = useMemo(
    () => [
      { value: '150+', label: language === 'en' ? 'Projects completed' : 'مشروع مكتمل' },
      { value: '50+', label: language === 'en' ? 'Happy clients' : 'عميل سعيد' },
      { value: '5+', label: language === 'en' ? 'Years experience' : 'سنوات خبرة' },
      { value: '24/7', label: language === 'en' ? 'Support' : 'دعم مستمر' }
    ],
    [language]
  );

  const floatingTech = useMemo(
    () => [
      { label: 'React', icon: <FaReact /> },
      { label: 'Shopify', icon: <FaShopify /> },
      { label: 'Node.js', icon: <FaNodeJs /> },
      { label: 'Python', icon: <FaPython /> },
      { label: 'AI', icon: <FaRobot /> },
      { label: 'CRM', icon: <FaHubspot /> },
      { label: 'ERP', icon: <FaDatabase /> }
    ],
    []
  );

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-floating-cloud" aria-hidden="true">
          {floatingTech.map((item, index) => (
            <span
              key={item.label}
              className={`hero-floating-badge badge-${(index % 7) + 1}`}
              style={{ '--delay': `${index * 0.75}s` }}
            >
              {item.icon}
              <em>{item.label}</em>
            </span>
          ))}
        </div>

        <div className="container hero-center">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="hero-eyebrow">
              {language === 'en' ? '4Pixels Digital Agency' : '4Pixels وكالة رقمية'}
            </span>
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">{heroSubtitle}</p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary hero-btn-primary">
                {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
                <FiArrowRight />
              </Link>
              <Link to="/projects" className="btn btn-outline hero-btn-outline">
                <FiEye />
                {language === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}
              </Link>
            </div>

            <div className="hero-metrics">
              {metrics.map((metric) => (
                <article key={metric.label} className="hero-metric">
                  <h3>{metric.value}</h3>
                  <p>{metric.label}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section home-block">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('services')}</h2>
            <p>
              {language === 'en'
                ? 'Practical, high-impact services to launch and scale your digital business.'
                : 'خدمات عملية عالية التأثير لإطلاق وتوسيع مشروعك الرقمي.'}
            </p>
          </div>

          <div className="services-grid-home">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                className="service-card-home"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="service-card-head">
                  <h3>{service.title?.[language] || service.title?.en}</h3>
                  <span className="service-price">${service.price}</span>
                </div>
                <span className="service-category-home">
                  {getCategoryLabel(service.category, language)}
                </span>
                <p>{service.description?.[language] || service.description?.en}</p>
                <div className="service-meta">
                  <span>{service.deliveryTime}</span>
                  <Link to={`/services/${service.id}`}>
                    {language === 'en' ? 'More details' : 'تفاصيل أكثر'}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="scroll-indicator">
            {language === 'en' ? '← Swipe to see more →' : '→ اسحب لرؤية المزيد ←'}
          </p>
        </div>
      </section>

      <section className="section home-block home-projects">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('projects')}</h2>
            <p>
              {language === 'en'
                ? 'Selected client work across e-commerce, SaaS, and growth-focused brands.'
                : 'نماذج أعمال مختارة عبر التجارة الإلكترونية ومنتجات SaaS.'}
            </p>
          </div>

          <div className="projects-grid-home">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card-home"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link to={`/projects/${project.id}`} className="project-media">
                  <img
                    src={project.images?.[0]}
                    alt={project.title?.[language] || project.title?.en}
                    loading="lazy"
                  />
                </Link>
                <div className="project-body">
                  <span className="project-category-home">
                    {getCategoryLabel(project.category, language)}
                  </span>
                  <h3>{project.title?.[language] || project.title?.en}</h3>
                  <p>{project.description?.[language] || project.description?.en}</p>
                  <Link to={`/projects/${project.id}`} className="project-link">
                    {language === 'en' ? 'View case study' : 'عرض دراسة الحالة'}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="scroll-indicator">
            {language === 'en' ? '← Swipe to see more →' : '→ اسحب لرؤية المزيد ←'}
          </p>
        </div>
      </section>

      <section className="section home-block home-reviews">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{language === 'en' ? 'Client Feedback' : 'آراء العملاء'}</h2>
            <p>
              {language === 'en'
                ? 'Real outcomes from teams who trusted us to ship and scale.'
                : 'نتائج حقيقية من فرق وثقت بنا في التنفيذ والتطوير.'}
            </p>
          </div>

          <div className="reviews-grid-home">
            {reviews.map((review, index) => (
              <motion.article
                key={review.id}
                className="review-card-home"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="review-top">
                  <img src={review.image} alt={review.name?.[language] || review.name?.en} loading="lazy" />
                  <div>
                    <h3>{review.name?.[language] || review.name?.en}</h3>
                    <span>{'★'.repeat(review.rating || 5)}</span>
                  </div>
                </div>
                <p>{review.text?.[language] || review.text?.en}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <div className="home-loading-state">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default Home;
