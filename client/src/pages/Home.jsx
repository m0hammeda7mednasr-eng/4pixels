import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiEye,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import {
  FaDatabase,
  FaHubspot,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRobot,
  FaShopify
} from 'react-icons/fa';
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

        setServices((servicesData || []).slice(0, 6));
        setProjects((projectsData || []).slice(0, 8));
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

  const copy =
    language === 'en'
      ? {
          eyebrow: '4Pixels Digital Systems Studio',
          heroTitleFallback: 'Build Shopify Stores, Automation Flows, and Business Systems That Scale',
          heroSubtitleFallback:
            'We design and implement complete digital operations: Shopify growth stores, CRM automation, data systems, and AI-powered media production.',
          primaryCta: 'Start Your Project',
          secondaryCta: 'Explore Case Studies',
          trust: [
            'Shopify implementation from A to Z',
            'CRM + automation workflows with real tracking',
            'AI-ready media and brand content production'
          ],
          pillarTitle: 'What We Build',
          pillarSubtitle:
            'A full execution model covering storefront growth, systems operations, and scalable automation.',
          processTitle: 'Execution System',
          processSubtitle: 'A clear framework to move from strategy to measurable delivery.',
          servicesIntro:
            'High-impact services focused on growth operations, revenue automation, and digital execution.',
          projectsIntro:
            'Selected projects delivered across Shopify commerce, operations automation, and systems engineering.',
          reviewsTitle: 'Client Feedback',
          reviewsIntro: 'Outcomes from teams that trusted 4Pixels with critical digital execution.',
          serviceDetails: 'More details',
          projectCaseStudy: 'View case study',
          finalTitle: 'Ready For High-Performance Digital Operations?',
          finalSubtitle:
            'Let us design your complete system with Shopify, automation, CRM, and AI-powered workflows.',
          finalPrimary: 'Book Discovery Call',
          finalSecondary: 'Open Services',
          noReviews: 'No reviews published yet.'
        }
      : {
          eyebrow: '4Pixels لحلول التحول الرقمي',
          heroTitleFallback: 'نبني متاجر Shopify وأنظمة الأتمتة وإدارة الأعمال بشكل احترافي قابل للتوسع',
          heroSubtitleFallback:
            'ننّفذ منظومة رقمية متكاملة: متاجر Shopify للنمو، أتمتة CRM، أنظمة بيانات وتشغيل، ومحتوى مرئي بالذكاء الاصطناعي للبراند.',
          primaryCta: 'ابدأ مشروعك الآن',
          secondaryCta: 'شاهد دراسات الحالة',
          trust: [
            'تنفيذ Shopify كامل من البداية للنهاية',
            'أتمتة CRM وعمليات متابعة قابلة للقياس',
            'إنتاج محتوى وصور وفيديو بالذكاء الاصطناعي'
          ],
          pillarTitle: 'ماذا ننفذ لك',
          pillarSubtitle:
            'نموذج تنفيذ متكامل يغطي نمو المتجر، الأنظمة التشغيلية، والأتمتة القابلة للتوسع.',
          processTitle: 'نظام التنفيذ',
          processSubtitle: 'منهج واضح يبدأ بالاستراتيجية وينتهي بنتائج تشغيلية حقيقية.',
          servicesIntro:
            'خدمات عالية التأثير موجهة للنمو التشغيلي، أتمتة الإيرادات، والتنفيذ الرقمي الاحترافي.',
          projectsIntro:
            'نماذج مشاريع حقيقية تم تسليمها عبر Shopify، الأتمتة التشغيلية، وهندسة الأنظمة.',
          reviewsTitle: 'آراء العملاء',
          reviewsIntro: 'نتائج فعلية من فرق اعتمدت على 4Pixels لتنفيذ أعمالها الرقمية.',
          serviceDetails: 'تفاصيل أكثر',
          projectCaseStudy: 'عرض دراسة الحالة',
          finalTitle: 'جاهز تبني نظام رقمي احترافي ينمو معك؟',
          finalSubtitle:
            'خلّينا نصمم لك منظومة متكاملة تضم Shopify + Automation + CRM + AI بشكل عملي قابل للتوسع.',
          finalPrimary: 'احجز مكالمة اكتشاف',
          finalSecondary: 'تصفح الخدمات',
          noReviews: 'لا توجد مراجعات منشورة حاليًا.'
        };

  const heroTitle = getLocalizedText(content?.hero?.title, language, copy.heroTitleFallback);
  const heroSubtitle = getLocalizedText(content?.hero?.subtitle, language, copy.heroSubtitleFallback);

  const featuredProjects = useMemo(() => {
    const pinned = projects.filter((project) => project.featured);
    if (pinned.length > 0) {
      return pinned.slice(0, 6);
    }

    return projects.slice(0, 6);
  }, [projects]);

  const metrics = useMemo(
    () => [
      {
        value: `${Math.max(projects.length, 24)}+`,
        label: language === 'en' ? 'Delivered systems' : 'أنظمة تم تنفيذها',
        icon: <FiLayers />
      },
      {
        value: `${Math.max(services.length, 6)}+`,
        label: language === 'en' ? 'Specialized offers' : 'خدمات متخصصة',
        icon: <FiZap />
      },
      {
        value: `${Math.max(reviews.length, 18)}+`,
        label: language === 'en' ? 'Verified outcomes' : 'نتائج موثقة',
        icon: <FiShield />
      },
      {
        value: '48h',
        label: language === 'en' ? 'Kickoff readiness' : 'جاهزية بدء التنفيذ',
        icon: <FiTrendingUp />
      }
    ],
    [language, projects.length, reviews.length, services.length]
  );

  const floatingTech = useMemo(
    () => [
      { label: 'React', icon: <FaReact /> },
      { label: 'Shopify', icon: <FaShopify /> },
      { label: 'Node.js', icon: <FaNodeJs /> },
      { label: 'Python', icon: <FaPython /> },
      { label: 'AI', icon: <FaRobot /> },
      { label: 'CRM', icon: <FaHubspot /> },
      { label: 'Data', icon: <FaDatabase /> }
    ],
    []
  );

  const pillars = useMemo(
    () => [
      {
        icon: <FaShopify />,
        title: language === 'en' ? 'Shopify Growth Stores' : 'متاجر Shopify للنمو',
        description:
          language === 'en'
            ? 'Conversion-first storefronts, optimized checkout, and scalable commerce architecture.'
            : 'متاجر احترافية مع تجربة شراء محسنة وبنية تجارة إلكترونية قابلة للنمو.'
      },
      {
        icon: <FaHubspot />,
        title: language === 'en' ? 'Automation & CRM Flows' : 'أتمتة وCRM',
        description:
          language === 'en'
            ? 'Lead routing, follow-up systems, and channel automation connected to your sales ops.'
            : 'أتمتة المتابعة وتأهيل العملاء وربط العمليات البيعية بمنظومة موحدة.'
      },
      {
        icon: <FaDatabase />,
        title: language === 'en' ? 'Systems & Data Operations' : 'أنظمة وتشغيل بيانات',
        description:
          language === 'en'
            ? 'Operational data models, reporting pipelines, and execution dashboards for teams.'
            : 'هيكلة البيانات التشغيلية ولوحات متابعة وأنظمة عمل تساعد فريقك على التنفيذ.'
      },
      {
        icon: <FaRobot />,
        title: language === 'en' ? 'AI Brand Media' : 'ميديا براند بالذكاء الاصطناعي',
        description:
          language === 'en'
            ? 'AI-powered visuals and videos that keep brand production fast, consistent, and premium.'
            : 'إنتاج صور وفيديو بالذكاء الاصطناعي بجودة عالية وسرعة تناسب نمو البراند.'
      }
    ],
    [language]
  );

  const steps = useMemo(
    () => [
      {
        number: '01',
        title: language === 'en' ? 'Audit & Blueprint' : 'تحليل وبناء الخطة',
        description:
          language === 'en'
            ? 'We map your goals, bottlenecks, and KPIs into one execution blueprint.'
            : 'نحول أهدافك وتحدياتك لمخطط تنفيذ واضح مع مؤشرات قياس عملية.'
      },
      {
        number: '02',
        title: language === 'en' ? 'Build & Integrate' : 'التنفيذ والربط',
        description:
          language === 'en'
            ? 'Storefronts, automation flows, and systems are implemented as one connected stack.'
            : 'نبني المتجر والأتمتة والأنظمة كمنظومة واحدة متصلة وقابلة للتوسع.'
      },
      {
        number: '03',
        title: language === 'en' ? 'Test & Optimize' : 'اختبار وتحسين',
        description:
          language === 'en'
            ? 'We validate tracking, performance, and conversion quality before launch.'
            : 'نختبر الأداء والتتبع والتحويلات ونحسن كل نقطة قبل الإطلاق.'
      },
      {
        number: '04',
        title: language === 'en' ? 'Scale With Insights' : 'توسع بالبيانات',
        description:
          language === 'en'
            ? 'Live dashboards and operational insights guide your next growth steps.'
            : 'لوحات المتابعة والتحليلات تساعدك على اتخاذ قرارات نمو أسرع وأدق.'
      }
    ],
    [language]
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
              className={`hero-floating-badge badge-${(index % floatingTech.length) + 1}`}
              style={{ '--delay': `${index * 0.8}s` }}
            >
              {item.icon}
              <em>{item.label}</em>
            </span>
          ))}
        </div>

        <div className="container hero-shell">
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

            <ul className="hero-trust-list">
              {copy.trust.map((item) => (
                <li key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.aside
            className="hero-side-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="hero-panel-head">
              <span>{language === 'en' ? 'Live Delivery Snapshot' : 'ملخص تنفيذ حي'}</span>
              <FiBarChart2 />
            </div>

            <div className="hero-metrics">
              {metrics.map((metric) => (
                <article key={`${metric.value}-${metric.label}`} className="hero-metric">
                  <div className="hero-metric-icon">{metric.icon}</div>
                  <div>
                    <h3>{metric.value}</h3>
                    <p>{metric.label}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      {error && (
        <section className="section home-block">
          <div className="container">
            <p className="scroll-indicator">{error}</p>
          </div>
        </section>
      )}

      <section className="section home-pillars">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{copy.pillarTitle}</h2>
            <p>{copy.pillarSubtitle}</p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="pillar-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-process">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{copy.processTitle}</h2>
            <p>{copy.processSubtitle}</p>
          </div>

          <div className="process-grid">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                className="process-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-block">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('services')}</h2>
            <p>{copy.servicesIntro}</p>
          </div>

          <div className="services-grid-home">
            {services.slice(0, 3).map((service, index) => (
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
        </div>
      </section>

      <section className="section home-block home-projects">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{t('projects')}</h2>
            <p>{copy.projectsIntro}</p>
          </div>

          <div className="projects-grid-home">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card-home"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
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
        </div>
      </section>

      <section className="section home-block home-reviews">
        <div className="container">
          <div className="block-header">
            <h2 className="section-title">{copy.reviewsTitle}</h2>
            <p>{copy.reviewsIntro}</p>
          </div>

          <div className="reviews-grid-home">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
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
              ))
            ) : (
              <p className="reviews-empty-text">{copy.noReviews}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>{copy.finalTitle}</h2>
            <p>{copy.finalSubtitle}</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary">
                {copy.finalPrimary}
                <FiArrowRight />
              </Link>
              <Link to="/services" className="btn btn-outline">
                {copy.finalSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {loading && (
        <div className="home-loading-state" aria-live="polite" aria-label="Loading content">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default Home;
