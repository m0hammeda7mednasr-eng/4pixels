import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye } from 'react-icons/fi';
import { FaDatabase, FaHubspot, FaNodeJs, FaPython, FaReact, FaRobot, FaShopify } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { getCategoryLabel } from '../utils/categoryLabels';
import { getLocalizedText } from '../utils/localization';
import './Home.css';

const Home = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchData = async () => {
      try {
        setError('');

        const [servicesData, projectsData, reviewsData, contentData] = await Promise.all([
          getCached('/services', { ttl: 120000, signal: controller.signal }),
          getCached('/projects', { ttl: 120000, signal: controller.signal }),
          getCached('/reviews', { ttl: 120000, signal: controller.signal }),
          getCached('/content', { ttl: 60000, signal: controller.signal })
        ]);

        if (!mounted) {
          return;
        }

        setServices((servicesData || []).slice(0, 3));
        setProjects((projectsData || []).slice(0, 6));
        setReviews((reviewsData || []).slice(0, 6));
        setContent(contentData || null);
      } catch (err) {
        if (controller.signal.aborted || !mounted) {
          return;
        }

        console.error('Error fetching home data:', err.userMessage || err.message);
        setError(
          language === 'en'
            ? 'Could not load latest content right now.'
            : 'تعذر تحميل أحدث المحتوى حاليًا.'
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [language]);

  const copy = language === 'en'
    ? {
        heroTitleFallback: 'Transform Your Digital Vision Into Reality',
        heroSubtitleFallback:
          'We craft exceptional digital experiences that drive growth and innovation for forward-thinking businesses.',
        eyebrow: '4Pixels Digital Agency',
        primaryCta: 'Start Your Project',
        secondaryCta: 'View Our Work',
        servicesIntro:
          'Practical, high-impact services to launch and scale your digital business.',
        projectsIntro:
          'Selected client work across e-commerce, SaaS, and growth-focused brands.',
        reviewsTitle: 'Client Feedback',
        reviewsIntro: 'Real outcomes from teams who trusted us to ship and scale.',
        serviceDetails: 'More details',
        projectCaseStudy: 'View case study',
        swipeHint: 'Swipe to see more',
        metrics: [
          { value: '150+', label: 'Projects completed' },
          { value: '50+', label: 'Happy clients' },
          { value: '5+', label: 'Years experience' },
          { value: '24/7', label: 'Support' }
        ]
      }
    : {
        heroTitleFallback: 'حوّل رؤيتك الرقمية إلى واقع فعلي',
        heroSubtitleFallback:
          'نصمم تجارب رقمية استثنائية تدفع النمو والابتكار للشركات الطموحة.',
        eyebrow: '4Pixels وكالة رقمية',
        primaryCta: 'ابدأ مشروعك',
        secondaryCta: 'شاهد أعمالنا',
        servicesIntro:
          'خدمات عملية عالية التأثير لإطلاق وتوسيع مشروعك الرقمي.',
        projectsIntro:
          'نماذج أعمال مختارة عبر التجارة الإلكترونية ومنتجات SaaS.',
        reviewsTitle: 'آراء العملاء',
        reviewsIntro: 'نتائج حقيقية من فرق وثقت بنا في التنفيذ والتطوير.',
        serviceDetails: 'تفاصيل أكثر',
        projectCaseStudy: 'عرض دراسة الحالة',
        swipeHint: 'اسحب لرؤية المزيد',
        metrics: [
          { value: '150+', label: 'مشروع مكتمل' },
          { value: '50+', label: 'عميل سعيد' },
          { value: '5+', label: 'سنوات خبرة' },
          { value: '24/7', label: 'دعم مستمر' }
        ]
      };

  const heroTitle = getLocalizedText(content?.hero?.title, language, copy.heroTitleFallback);
  const heroSubtitle = getLocalizedText(content?.hero?.subtitle, language, copy.heroSubtitleFallback);

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
            <span className="hero-eyebrow">{copy.eyebrow}</span>
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">{heroSubtitle}</p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary hero-btn-primary">
                {copy.primaryCta}
                <FiArrowRight />
              </Link>
              <Link to="/projects" className="btn btn-outline hero-btn-outline">
                <FiEye />
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="hero-metrics">
              {copy.metrics.map((metric) => (
                <article key={`${metric.value}-${metric.label}`} className="hero-metric">
                  <h3>{metric.value}</h3>
                  <p>{metric.label}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {error && (
        <section className="section home-block">
          <div className="container">
            <p className="scroll-indicator">{error}</p>
          </div>
        </section>
      )}

      <section className="section home-block">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('services')}</h2>
            <p>{copy.servicesIntro}</p>
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
                  <h3>{getLocalizedText(service.title, language)}</h3>
                  <span className="service-price">${service.price}</span>
                </div>
                <span className="service-category-home">
                  {getCategoryLabel(service.category, language)}
                </span>
                <p>{getLocalizedText(service.description, language)}</p>
                <div className="service-meta">
                  <span>{service.deliveryTime}</span>
                  <Link to={`/services/${service.id}`}>
                    {copy.serviceDetails}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          {services.length > 0 && (
            <p className="scroll-indicator">
              {language === 'en' ? `← ${copy.swipeHint} →` : `→ ${copy.swipeHint} ←`}
            </p>
          )}
        </div>
      </section>

      <section className="section home-block home-projects">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('projects')}</h2>
            <p>{copy.projectsIntro}</p>
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
                    alt={getLocalizedText(project.title, language, 'Project')}
                    loading="lazy"
                  />
                </Link>
                <div className="project-body">
                  <span className="project-category-home">
                    {getCategoryLabel(project.category, language)}
                  </span>
                  <h3>{getLocalizedText(project.title, language)}</h3>
                  <p>{getLocalizedText(project.description, language)}</p>
                  <Link to={`/projects/${project.id}`} className="project-link">
                    {copy.projectCaseStudy}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
          {projects.length > 0 && (
            <p className="scroll-indicator">
              {language === 'en' ? `← ${copy.swipeHint} →` : `→ ${copy.swipeHint} ←`}
            </p>
          )}
        </div>
      </section>

      <section className="section home-block home-reviews">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{copy.reviewsTitle}</h2>
            <p>{copy.reviewsIntro}</p>
          </div>

          {reviews.length > 4 && (
            <div className="reviews-scroll-hint">
              <FiArrowRight />
            </div>
          )}

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
                  <img
                    src={review.image}
                    alt={getLocalizedText(review.name, language, 'Client')}
                    loading="lazy"
                  />
                  <div>
                    <h3>{getLocalizedText(review.name, language)}</h3>
                    <span>{'★'.repeat(review.rating || 5)}</span>
                  </div>
                </div>
                <p>{getLocalizedText(review.text, language)}</p>
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
