import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import { FaDatabase, FaHubspot, FaRobot, FaShopify } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { getCategoryLabel } from '../utils/categoryLabels';
import { getLocalizedArray, getLocalizedText } from '../utils/localization';
import './Home.css';

const Home = () => {
  const { language } = useLanguage();
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
        setProjects((projectsData || []).slice(0, 4));
        setReviews((reviewsData || []).slice(0, 2));
        setContent(contentData || null);
      } catch (err) {
        if (controller.signal.aborted || !mounted) {
          return;
        }

        console.error('Error fetching home data:', err.userMessage || err.message);
        setError(
          language === 'en'
            ? 'Some live content could not be loaded right now.'
            : 'تعذر تحميل بعض بيانات الصفحة الآن.'
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
          eyebrow: '4 Pixels Delivery Studio',
          heroTitleFallback: 'Build faster storefronts, smarter automation, and cleaner operations.',
          heroSubtitleFallback:
            'We design and ship premium Shopify experiences, AI-powered workflows, and operational systems that help brands move with confidence.',
          primaryCta: 'Start Your Project',
          secondaryCta: 'Explore Portfolio',
          heroPoints: [
            'Premium Shopify design and conversion-focused development.',
            'Automation flows that reduce manual work and improve speed.',
            'Operational systems with dashboards, data quality, and handoff clarity.'
          ],
          marketLabel: 'Built for brands, operators, and teams that need execution.',
          marketFocus: ['Shopify Brands', 'Scale-Up Teams', 'Operations Leaders', 'Modern Startups'],
          boardEyebrow: 'Live Delivery Board',
          boardTitle: 'One execution lane from brief to launch.',
          boardStatus: 'Ready in 48h',
          boardSteps: [
            {
              title: 'Discover',
              description: 'Audit goals, current stack, blockers, and commercial priorities.'
            },
            {
              title: 'Build',
              description: 'Design, implement, test, and connect every operational layer.'
            },
            {
              title: 'Scale',
              description: 'Improve speed, reporting, and performance after go-live.'
            }
          ],
          capabilitiesEyebrow: 'How We Work',
          capabilitiesTitle: 'A company portfolio should prove execution, not just look polished.',
          capabilitiesSubtitle:
            '4 Pixels combines visual quality, systems thinking, and measurable delivery in one workflow.',
          storyTitle: 'Why teams hire us',
          storyText:
            'We operate like a delivery partner, not a loose collection of freelancers. Design, automation, and operations are aligned from the first brief.',
          storyPoints: [
            'Clear delivery scope and practical roadmap from day one.',
            'Design decisions that support conversion, speed, and usability.',
            'Implementation that connects Shopify, CRM, data, and automation.'
          ],
          frameworkTitle: 'Execution Framework',
          frameworkSubtitle: 'Four lanes that keep strategy and production connected.',
          framework: [
            {
              icon: <FaShopify />,
              title: 'Shopify Experience',
              description: 'Stores, landing pages, collection structure, and checkout UX with premium visual direction.'
            },
            {
              icon: <FaHubspot />,
              title: 'Automation Flow',
              description: 'CRM routing, follow-up logic, notifications, approvals, and lead qualification.'
            },
            {
              icon: <FaDatabase />,
              title: 'Data Operations',
              description: 'Dashboards, spreadsheets, reporting structure, and operational accuracy.'
            },
            {
              icon: <FaRobot />,
              title: 'AI-Ready Production',
              description: 'Automated content assistance, workflow intelligence, and faster creative output.'
            }
          ],
          servicesEyebrow: 'Service Stack',
          servicesTitle: 'Focused offers built for business outcomes.',
          servicesSubtitle:
            'Each service is designed to stand alone or integrate into one full digital operating system.',
          serviceDetails: 'Open service',
          servicesCta: 'View All Services',
          projectsEyebrow: 'Selected Work',
          projectsTitle: 'Recent delivery across commerce, automation, and systems.',
          projectsSubtitle:
            'A practical portfolio of launches, migrations, and process redesign projects with real operational value.',
          spotlight: 'Featured Case',
          moreProjects: 'More selected work',
          projectCaseStudy: 'View case study',
          viewAllProjects: 'Browse All Projects',
          reviewsEyebrow: 'Client Confidence',
          reviewsTitle: 'Feedback from teams that trusted us with execution.',
          reviewsSubtitle:
            'Results matter, but clarity, speed, and communication matter just as much during delivery.',
          noReviews: 'No published reviews yet.',
          finalTitle: 'Need a portfolio-level website and systems layer that actually feels premium?',
          finalSubtitle:
            'Let us shape the full experience: messaging, UX, development, automation, and the business layer behind it.',
          finalPrimary: 'Book Discovery Call',
          finalSecondary: 'Go To Contact'
        }
      : {
          eyebrow: 'استوديو 4 Pixels للتنفيذ الرقمي',
          heroTitleFallback: 'ابنِ متجرًا أسرع، وأتمتة أذكى، وعمليات تشغيل أكثر وضوحًا.',
          heroSubtitleFallback:
            'نصمم وننفذ تجارب Shopify احترافية وتدفقات أتمتة مدعومة بالذكاء الاصطناعي وأنظمة تشغيل تساعد البراندات على النمو بثبات.',
          primaryCta: 'ابدأ مشروعك',
          secondaryCta: 'شاهد البورتفوليو',
          heroPoints: [
            'تصميم وتجربة Shopify احترافية تركّز على التحويل والسرعة.',
            'تدفقات أتمتة تقلل العمل اليدوي وتسرّع التشغيل.',
            'أنظمة تشغيل ولوحات متابعة بجودة عالية وتسليم واضح.'
          ],
          marketLabel: 'مناسب للبراندات والفرق التي تحتاج تنفيذًا حقيقيًا لا مجرد كلام.',
          marketFocus: ['براندات Shopify', 'فرق النمو', 'قادة التشغيل', 'شركات ناشئة حديثة'],
          boardEyebrow: 'لوحة تنفيذ مباشرة',
          boardTitle: 'مسار تنفيذ واحد من الملخص حتى الإطلاق.',
          boardStatus: 'جاهزون خلال 48 ساعة',
          boardSteps: [
            {
              title: 'فهم المشروع',
              description: 'تحليل الأهداف والتحديات الحالية والأدوات وأولويات النمو.'
            },
            {
              title: 'التنفيذ',
              description: 'تصميم وبناء وربط كل الطبقات التشغيلية واختبارها فعليًا.'
            },
            {
              title: 'التوسع',
              description: 'تحسين السرعة والتقارير والأداء بعد التشغيل.'
            }
          ],
          capabilitiesEyebrow: 'أسلوب العمل',
          capabilitiesTitle: 'الموقع الاحترافي لازم يثبت جودة التنفيذ، وليس الشكل فقط.',
          capabilitiesSubtitle:
            '4 Pixels تجمع بين جودة التصميم، وفكر الأنظمة، والتسليم القابل للقياس داخل مسار عمل واحد.',
          storyTitle: 'لماذا تختارنا الفرق الجادة',
          storyText:
            'نشتغل كشريك تنفيذ متكامل، وليس كمجموعة أفراد منفصلة. التصميم والأتمتة والتشغيل عندنا يتحركون معًا من أول ملخص.',
          storyPoints: [
            'نطاق عمل واضح وخارطة تنفيذ عملية من البداية.',
            'قرارات تصميم تدعم التحويل والسرعة وسهولة الاستخدام.',
            'تنفيذ يربط Shopify وCRM والبيانات والأتمتة في منظومة واحدة.'
          ],
          frameworkTitle: 'إطار التنفيذ',
          frameworkSubtitle: 'أربع مسارات تربط الاستراتيجية بالإنتاج الفعلي.',
          framework: [
            {
              icon: <FaShopify />,
              title: 'تجربة Shopify',
              description: 'متاجر وصفحات هبوط وهيكلة منتجات وتجربة شراء بمستوى بصري premium.'
            },
            {
              icon: <FaHubspot />,
              title: 'تدفقات الأتمتة',
              description: 'ربط CRM والمتابعة والتنبيهات والموافقات وتأهيل العملاء المحتملين.'
            },
            {
              icon: <FaDatabase />,
              title: 'تشغيل البيانات',
              description: 'لوحات متابعة وهيكلة تقارير وتشغيل بيانات بدقة واستقرار.'
            },
            {
              icon: <FaRobot />,
              title: 'إنتاج مدعوم بالذكاء الاصطناعي',
              description: 'محتوى أسرع، تدفقات أكثر ذكاءً، ودعم للإنتاج الإبداعي والتشغيلي.'
            }
          ],
          servicesEyebrow: 'حزمة الخدمات',
          servicesTitle: 'خدمات مركزة على النتيجة التجارية.',
          servicesSubtitle:
            'كل خدمة يمكن تنفيذها بشكل مستقل أو دمجها داخل منظومة تشغيل رقمية كاملة.',
          serviceDetails: 'عرض الخدمة',
          servicesCta: 'كل الخدمات',
          projectsEyebrow: 'أعمال مختارة',
          projectsTitle: 'تنفيذ حديث عبر التجارة والأتمتة والأنظمة.',
          projectsSubtitle:
            'بورتفوليو عملي يضم إطلاقات جديدة وعمليات نقل وتحسين تدفقات تشغيل لها قيمة فعلية.',
          spotlight: 'حالة مميزة',
          moreProjects: 'مشاريع أخرى مختارة',
          projectCaseStudy: 'عرض دراسة الحالة',
          viewAllProjects: 'تصفح كل المشاريع',
          reviewsEyebrow: 'ثقة العملاء',
          reviewsTitle: 'آراء فرق اعتمدت علينا في التنفيذ.',
          reviewsSubtitle:
            'النتائج مهمة، لكن الوضوح والسرعة وجودة التواصل أثناء التنفيذ مهمون بنفس الدرجة.',
          noReviews: 'لا توجد مراجعات منشورة حاليًا.',
          finalTitle: 'تحتاج موقع شركة وبنية تشغيل فعلًا بمستوى premium؟',
          finalSubtitle:
            'نقدر نبني لك التجربة كاملة: الرسالة، والواجهة، والتطوير، والأتمتة، والطبقة التشغيلية خلف الموقع.',
          finalPrimary: 'احجز جلسة اكتشاف',
          finalSecondary: 'اذهب للتواصل'
        };

  const heroTitle = getLocalizedText(content?.hero?.title, language, copy.heroTitleFallback);
  const heroSubtitle = getLocalizedText(
    content?.hero?.subtitle,
    language,
    copy.heroSubtitleFallback
  );
  const companySummary =
    language === 'en'
      ? 'Company websites, Shopify builds, and automation systems delivered with a cleaner structure.'
      : 'مواقع شركات ومتاجر Shopify وأنظمة أتمتة بتنفيذ أنظف وهيكلة أوضح.';

  const featuredProjects = useMemo(() => {
    const pinned = projects.filter((project) => project.featured);
    return (pinned.length > 0 ? pinned : projects).slice(0, 3);
  }, [projects]);

  const leadProject = featuredProjects[0] || null;
  const secondaryProjects = featuredProjects.slice(1, 3);
  const featuredReviews = reviews.slice(0, 2);

  const metrics = useMemo(
    () => [
      {
        value: `${Math.max(projects.length, 18)}+`,
        label: language === 'en' ? 'Projects delivered' : 'مشروعات تم تنفيذها',
        icon: <FiLayers />
      },
      {
        value: `${Math.max(services.length, 3)}`,
        label: language === 'en' ? 'Execution offers' : 'مسارات خدمة',
        icon: <FiZap />
      },
      {
        value: `${Math.max(reviews.length, 6)}+`,
        label: language === 'en' ? 'Client signals' : 'إشارات ثقة',
        icon: <FiShield />
      },
      {
        value: '48h',
        label: language === 'en' ? 'Kickoff readiness' : 'جاهزية الانطلاق',
        icon: <FiClock />
      }
    ],
    [language, projects.length, reviews.length, services.length]
  );

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-orb hero-orb-a" />
        <div className="home-hero-orb hero-orb-b" />
        <div className="home-hero-gridlines" aria-hidden="true" />

        <div className="container home-hero-layout">
          <motion.div
            className="home-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{heroTitle}</h1>
            <p>{heroSubtitle}</p>

            <div className="home-hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                {copy.primaryCta}
                <FiArrowRight />
              </Link>
              <Link to="/projects" className="btn btn-outline btn-lg">
                {copy.secondaryCta}
              </Link>
            </div>

            <ul className="home-hero-points">
              {copy.heroPoints.map((item) => (
                <li key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </motion.div>

          <motion.aside
            className="home-hero-board"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="home-board-brand">
              <div className="home-board-brand-mark">4P</div>
              <div className="home-board-brand-copy">
                <strong>4 Pixels</strong>
                <p>{companySummary}</p>
              </div>
            </div>

            <div className="home-board-head">
              <div>
                <span>{copy.boardEyebrow}</span>
                <h2>{copy.boardTitle}</h2>
              </div>
              <div className="home-board-status">
                <FiBarChart2 />
                {copy.boardStatus}
              </div>
            </div>

            <div className="home-board-metrics">
              {metrics.map((metric) => (
                <article key={`${metric.label}-${metric.value}`} className="home-board-metric">
                  <div className="home-board-icon">{metric.icon}</div>
                  <div>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-board-steps">
              {copy.boardSteps.map((step, index) => (
                <article key={step.title} className="home-step-card">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>

          </motion.aside>
        </div>
      </section>

      {error ? (
        <section className="home-feedback">
          <div className="container">
            <p>{error}</p>
          </div>
        </section>
      ) : null}

      <section className="section home-services">
        <div className="container">
          <div className="section-copy home-section-heading">
            <span className="page-eyebrow">{copy.servicesEyebrow}</span>
            <h2>{copy.servicesTitle}</h2>
            <p>{copy.servicesSubtitle}</p>
          </div>

          <div className="home-services-grid">
            {services.map((service, index) => {
              const title = getLocalizedText(service.title, language, 'Service');
              const description = getLocalizedText(service.description, language);
              const features = getLocalizedArray(service.features, language).slice(0, 2);

              return (
                <motion.article
                  key={service.id}
                  className="home-service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="home-service-top">
                    <span className="home-service-category">
                      {getCategoryLabel(service.category, language)}
                    </span>
                    <strong>${service.price}</strong>
                  </div>

                  <h3>{title}</h3>
                  <p>{description}</p>

                  <ul className="home-service-features">
                    {features.map((feature) => (
                      <li key={feature}>
                        <FiCheckCircle />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="home-service-footer">
                    <span>
                      <FiTrendingUp />
                      {service.deliveryTime}
                    </span>
                    <Link to={`/services/${service.id}`}>
                      {copy.serviceDetails}
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="home-section-action">
            <Link to="/services" className="btn btn-outline">
              {copy.servicesCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-copy home-section-heading">
            <span className="page-eyebrow">{copy.projectsEyebrow}</span>
            <h2>{copy.projectsTitle}</h2>
            <p>{copy.projectsSubtitle}</p>
          </div>

          {leadProject ? (
            <div className="home-projects-layout">
              <motion.article
                className="home-project-spotlight"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <Link to={`/projects/${leadProject.id}`} className="home-project-media">
                  <img
                    src={leadProject.images?.[0]}
                    alt={getLocalizedText(leadProject.title, language, 'Project')}
                    loading="lazy"
                  />
                </Link>

                <div className="home-project-body">
                  <div className="home-project-meta">
                    <span className="home-project-badge">{copy.spotlight}</span>
                    <span>{getCategoryLabel(leadProject.category, language)}</span>
                  </div>

                  <h3>{getLocalizedText(leadProject.title, language)}</h3>
                  <p>{getLocalizedText(leadProject.description, language)}</p>

                  <div className="home-project-tags">
                    {(leadProject.tags || []).slice(0, 2).map((tag) => (
                      <span key={`${leadProject.id}-${tag}`}>{tag}</span>
                    ))}
                  </div>

                  <Link to={`/projects/${leadProject.id}`} className="home-project-link">
                    {copy.projectCaseStudy}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>

              <div className="home-project-list">
                <div className="home-project-list-head">
                  <h3>{copy.moreProjects}</h3>
                  <Link to="/projects">{copy.viewAllProjects}</Link>
                </div>

                {secondaryProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    className="home-project-mini"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link to={`/projects/${project.id}`} className="home-project-mini-media">
                      <img
                        src={project.images?.[0]}
                        alt={getLocalizedText(project.title, language, 'Project')}
                        loading="lazy"
                      />
                    </Link>

                    <div className="home-project-mini-body">
                      <span>{getCategoryLabel(project.category, language)}</span>
                      <h4>{getLocalizedText(project.title, language)}</h4>
                      <p>{getLocalizedText(project.description, language)}</p>
                      <Link to={`/projects/${project.id}`}>
                        {copy.projectCaseStudy}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section home-reviews">
        <div className="container">
          <div className="section-copy home-section-heading">
            <span className="page-eyebrow">{copy.reviewsEyebrow}</span>
            <h2>{copy.reviewsTitle}</h2>
            <p>{copy.reviewsSubtitle}</p>
          </div>

          <div className="home-reviews-grid">
            {featuredReviews.length > 0 ? (
              featuredReviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  className="home-review-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="home-review-head">
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
              <p className="home-reviews-empty">{copy.noReviews}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <div className="container">
          <motion.div
            className="home-cta-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
          >
            <div className="home-cta-copy">
              <span className="page-eyebrow">{copy.eyebrow}</span>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalSubtitle}</p>
            </div>

            <div className="home-cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                {copy.finalPrimary}
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                {copy.finalSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="home-loading-state" aria-live="polite" aria-label="Loading content">
          <div className="spinner" />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
