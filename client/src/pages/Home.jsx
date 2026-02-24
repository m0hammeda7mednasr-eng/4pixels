import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTrendingUp, FiLayers, FiCheckCircle } from 'react-icons/fi';
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
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroTitle =
    content?.hero?.title?.[language] ||
    (language === 'en' ? 'Build a Brand People Remember' : 'ابني علامة تجارية لا تنسى');

  const heroSubtitle =
    content?.hero?.subtitle?.[language] ||
    (language === 'en'
      ? 'We design and deliver high-converting digital products for ambitious businesses.'
      : 'نصمم وننفذ منتجات رقمية عالية التحويل للشركات الطموحة.');

  const metrics = useMemo(
    () => [
      {
        value: '150+',
        label: language === 'en' ? 'Projects delivered' : 'مشروع تم تسليمه',
        icon: <FiLayers />
      },
      {
        value: '98%',
        label: language === 'en' ? 'Client satisfaction' : 'رضا العملاء',
        icon: <FiStar />
      },
      {
        value: '5+',
        label: language === 'en' ? 'Years of execution' : 'سنوات خبرة',
        icon: <FiTrendingUp />
      }
    ],
    [language]
  );

  const techStack = useMemo(
    () => [
      'Shopify',
      'React',
      'Node.js',
      language === 'en' ? 'AI Automation' : 'أتمتة ذكية',
      'CRM',
      'ERP',
      'Google Sheets',
      'Webhook',
      'API Integration',
      'Data Entry Ops'
    ],
    [language]
  );

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="container hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="hero-eyebrow">
              {language === 'en' ? 'Digital Products. Real Growth.' : 'حلول رقمية بنتائج حقيقية'}
            </span>
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">{heroSubtitle}</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                {language === 'en' ? 'Start your project' : 'ابدأ مشروعك'}
                <FiArrowRight />
              </Link>
              <Link to="/projects" className="btn btn-outline">
                {language === 'en' ? 'See portfolio' : 'شاهد الأعمال'}
              </Link>
            </div>

            <div className="hero-tech-wrap" aria-label="Technology stack">
              <div className="hero-tech-track">
                {[...techStack, ...techStack].map((item, index) => (
                  <span key={`${item}-${index}`} className="hero-tech-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3>{language === 'en' ? 'What you get with 4Pixels' : 'ماذا تحصل مع 4Pixels'}</h3>
            <ul>
              <li>
                <FiCheckCircle />
                {language === 'en' ? 'Strategic product thinking from day one' : 'تفكير استراتيجي من أول يوم'}
              </li>
              <li>
                <FiCheckCircle />
                {language === 'en' ? 'Clean UX built for conversion and retention' : 'تجربة مستخدم نظيفة لرفع التحويل'}
              </li>
              <li>
                <FiCheckCircle />
                {language === 'en' ? 'Fast execution with transparent communication' : 'تنفيذ سريع وتواصل واضح'}
              </li>
              <li>
                <FiCheckCircle />
                {language === 'en' ? 'Reliable support after launch' : 'دعم فعلي بعد الإطلاق'}
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="home-metrics section">
        <div className="container">
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="metric-icon">{metric.icon}</span>
                <h3>{metric.value}</h3>
                <p>{metric.label}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-block">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('services')}</h2>
            <p>
              {language === 'en'
                ? 'Practical, high-impact services to launch and scale your digital business.'
                : 'خدمات عملية وعالية التأثير لإطلاق وتوسيع مشروعك الرقمي.'}
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
                  <h3>{service.title?.[language]}</h3>
                  <span className="service-price">${service.price}</span>
                </div>
                <span className="service-category-home">
                  {getCategoryLabel(service.category, language)}
                </span>
                <p>{service.description?.[language]}</p>
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
                  <img src={project.images?.[0]} alt={project.title?.[language]} loading="lazy" />
                </Link>
                <div className="project-body">
                  <span className="project-category-home">
                    {getCategoryLabel(project.category, language)}
                  </span>
                  <h3>{project.title?.[language]}</h3>
                  <p>{project.description?.[language]}</p>
                  <Link to={`/projects/${project.id}`} className="project-link">
                    {language === 'en' ? 'View case study' : 'عرض دراسة الحالة'}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
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
                  <img src={review.image} alt={review.name?.[language]} loading="lazy" />
                  <div>
                    <h3>{review.name?.[language]}</h3>
                    <span>{'★'.repeat(review.rating || 5)}</span>
                  </div>
                </div>
                <p>{review.text?.[language]}</p>
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
