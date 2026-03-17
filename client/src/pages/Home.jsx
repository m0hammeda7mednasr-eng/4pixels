import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import { FaDatabase, FaHubspot, FaRobot, FaShopify } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { getCategoryLabel } from '../utils/categoryLabels';
import { getLocalizedArray, getLocalizedText } from '../utils/localization';
import './Home.css';

const revealUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 }
};

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
        setProjects((projectsData || []).slice(0, 5));
        setReviews((reviewsData || []).slice(0, 3));
        setContent(contentData || null);
      } catch (err) {
        if (controller.signal.aborted || !mounted) {
          return;
        }

        console.error('Error fetching home data:', err.userMessage || err.message);
        setError(
          language === 'en'
            ? 'Some live content could not be loaded right now.'
            : 'تعذر تحميل بعض البيانات الحية حالياً.'
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
          eyebrow: '4 Pixels Company Profile',
          heroTitleFallback: 'Sharper digital products for teams that want serious execution.',
          heroSubtitleFallback:
            'We design company websites, Shopify experiences, and operational systems with a premium visual layer and a clean delivery model.',
          heroNote:
            'Built for brands, founders, and internal teams that need a website to look credible and work hard for the business.',
          primaryCta: 'Start a Brief',
          secondaryCta: 'See Projects',
          heroChecklist: [
            'Company-profile websites with clear positioning and premium interface design.',
            'Shopify development, landing pages, and conversion-focused structure.',
            'Automation, CRM, and Google Sheets workflows that keep operations moving.'
          ],
          heroTags: ['Company Profiles', 'Shopify', 'Automation', 'Google Workspace'],
          boardEyebrow: 'Delivery Cockpit',
          boardTitle: 'Design, development, and systems in one operating lane.',
          boardText:
            'Instead of disconnected freelancers, you get one structured team shaping the message, interface, and backend workflow together.',
          boardStatus: 'Kickoff in 48h',
          boardStats: [
            { label: 'Launch track', value: 'Strategy > UI > Build' },
            { label: 'Working model', value: 'Remote, fast, structured' }
          ],
          boardSteps: [
            {
              title: 'Clarify the offer',
              description:
                'We define the message, audience, and commercial priorities before the visuals start.'
            },
            {
              title: 'Build the experience',
              description:
                'Interface design, page structure, and development are shaped as one system.'
            },
            {
              title: 'Operational handoff',
              description:
                'Automation, data flow, and launch support make the website useful after go-live.'
            }
          ],
          boardTags: ['Premium UI', 'Shopify Builds', 'Automation Ops'],
          storyEyebrow: 'Why 4 Pixels',
          storyTitle:
            'A company site should look premium, explain value fast, and support delivery behind the scenes.',
          storyText:
            'We treat the front-end brand layer and the operational layer as one product. That is why the result feels sharper, not just prettier.',
          storyPoints: [
            'Clean messaging that makes the offer obvious in seconds.',
            'Design direction that feels modern, intentional, and commercially useful.',
            'Execution that connects interface, workflows, and business operations.'
          ],
          principlesTitle: 'What changes when the work is done right',
          frameworkEyebrow: 'Execution Model',
          frameworkTitle:
            'Four lanes that turn a polished website into a working business asset.',
          frameworkSubtitle:
            'We combine brand presentation, storefront logic, automation, and reporting in a single flow.',
          servicesEyebrow: 'Services',
          servicesTitle: 'Core offers for brands that need real delivery.',
          servicesSubtitle:
            'Each offer can launch on its own or connect into one full digital system.',
          serviceDetails: 'Open service',
          servicesCta: 'All services',
          emptyServices: 'Services will appear here once they are published.',
          projectsEyebrow: 'Selected Work',
          projectsTitle: 'Recent projects across commerce, automation, and internal systems.',
          projectsSubtitle:
            'A mix of launches, migrations, workflow redesign, and data operations work.',
          spotlight: 'Featured Project',
          moreProjects: 'More selected work',
          projectCaseStudy: 'View project',
          viewAllProjects: 'Browse all projects',
          emptyProjects: 'Projects will appear here once they are published.',
          reviewsEyebrow: 'Client Feedback',
          reviewsTitle: 'Teams come for quality, but stay because the process is clear.',
          reviewsSubtitle:
            'Fast communication, clean handoff, and good taste are part of the product.',
          noReviews: 'No published reviews yet.',
          finalEyebrow: 'Ready to Build',
          finalTitle:
            'Need a stronger company profile, store, or system behind the brand?',
          finalSubtitle:
            'We can shape the messaging, interface, development, and operational workflows into one solid delivery plan.',
          finalPrimary: 'Book a Discovery Call',
          finalSecondary: 'Contact Us'
        }
      : {
          eyebrow: 'بروفايل 4 Pixels',
          heroTitleFallback: 'مواقع وشغل رقمي يدي شركتك شكل أقوى وثقة أعلى.',
          heroSubtitleFallback:
            'نصمم وننفذ مواقع شركات، تجارب Shopify، وأنظمة تشغيل رقمية بواجهة premium وتنفيذ منظم من أول خطوة لآخر تسليم.',
          heroNote:
            'مناسب للبراندات والشركات والفرق اللي محتاجة موقع شكله محترف ويشتغل فعلاً لصالح البيزنس.',
          primaryCta: 'ابدأ الملخص',
          secondaryCta: 'شوف المشاريع',
          heroChecklist: [
            'مواقع بروفايل شركات برسالة واضحة وواجهة احترافية.',
            'تطوير Shopify ولاندنج بيدج وهيكلة ترفع التحويل.',
            'أتمتة وCRM وGoogle Sheets يخلو التشغيل أسرع وأنضف.'
          ],
          heroTags: ['بروفايل شركات', 'Shopify', 'أتمتة', 'Google Workspace'],
          boardEyebrow: 'لوحة التنفيذ',
          boardTitle: 'التصميم والتطوير والأنظمة في مسار واحد.',
          boardText:
            'بدل ما الشغل يتقسم بين أطراف منفصلة، عندك فريق واحد بيجمع الرسالة والواجهة والتنفيذ والتشغيل في نفس الخط.',
          boardStatus: 'بداية خلال 48 ساعة',
          boardStats: [
            { label: 'مسار الشغل', value: 'رسالة > UI > تطوير' },
            { label: 'طريقة العمل', value: 'عن بعد، سريع، منظم' }
          ],
          boardSteps: [
            {
              title: 'فهم البيزنس',
              description:
                'نحدد الرسالة والجمهور وأولوية الخدمات اللي لازم تظهر بشكل مقنع من البداية.'
            },
            {
              title: 'بناء التجربة',
              description:
                'نصمم الواجهة ونبني الصفحات والربط التقني كمنظومة واحدة، مش أجزاء متفرقة.'
            },
            {
              title: 'تشغيل وتسليم',
              description:
                'نرتب الأتمتة والبيانات وخطوات الإطلاق علشان الموقع يكمل شغله بعد التسليم.'
            }
          ],
          boardTags: ['واجهات احترافية', 'متاجر Shopify', 'أنظمة تشغيل'],
          storyEyebrow: 'ليه 4 Pixels',
          storyTitle:
            'موقع الشركة لازم يدي انطباع قوي، يشرح القيمة بسرعة، ويخدم التشغيل اللي وراه.',
          storyText:
            'إحنا بنعامل الواجهة والأنظمة التشغيلية كمنتج واحد. علشان كده النتيجة بتطلع أذكى وأوضح، مش مجرد شكل حلو.',
          storyPoints: [
            'رسالة واضحة تخلي العميل يفهم قيمة الشغل في ثواني.',
            'تصميم محسوب يبان premium وفي نفس الوقت مفيد تجارياً.',
            'تنفيذ يربط الواجهة مع الأتمتة والعمليات اليومية فعلياً.'
          ],
          principlesTitle: 'الفرق اللي بيظهر لما التنفيذ يبقى مظبوط',
          frameworkEyebrow: 'طريقة التنفيذ',
          frameworkTitle: 'أربع مسارات تحول الموقع من شكل كويس لأصل تجاري يشتغل فعلاً.',
          frameworkSubtitle:
            'بنربط صورة البراند، منطق البيع، الأتمتة، والتقارير داخل مسار تنفيذ واحد.',
          servicesEyebrow: 'الخدمات',
          servicesTitle: 'خدمات أساسية للبراندات اللي محتاجة شغل جاد.',
          servicesSubtitle:
            'كل خدمة تقدر تبدأ لوحدها أو تدخل ضمن منظومة رقمية كاملة للشركة.',
          serviceDetails: 'عرض الخدمة',
          servicesCta: 'كل الخدمات',
          emptyServices: 'الخدمات هتظهر هنا بعد النشر.',
          projectsEyebrow: 'أعمال مختارة',
          projectsTitle: 'مشاريع حديثة في التجارة والأتمتة والأنظمة الداخلية.',
          projectsSubtitle:
            'إطلاقات ونقل منصات وتحسين تدفقات تشغيل ومشاريع بيانات لها قيمة فعلية.',
          spotlight: 'مشروع مميز',
          moreProjects: 'مشاريع مختارة أخرى',
          projectCaseStudy: 'عرض المشروع',
          viewAllProjects: 'تصفح كل المشاريع',
          emptyProjects: 'المشاريع هتظهر هنا بعد النشر.',
          reviewsEyebrow: 'آراء العملاء',
          reviewsTitle: 'الفرق بتبدأ معنا بسبب الجودة، وتكمل بسبب وضوح العملية.',
          reviewsSubtitle:
            'سرعة الرد وجودة التسليم والذوق البصري جزء من الخدمة نفسها.',
          noReviews: 'لا توجد مراجعات منشورة حالياً.',
          finalEyebrow: 'جاهز نبدأ',
          finalTitle: 'محتاج موقع شركة أقوى، متجر أشيك، أو سيستم أنضف وراء البراند؟',
          finalSubtitle:
            'نقدر نبني الرسالة والواجهة والتطوير والتشغيل في خطة تنفيذ واحدة وواضحة.',
          finalPrimary: 'احجز جلسة اكتشاف',
          finalSecondary: 'تواصل معنا'
        };

  const principleItems = useMemo(
    () =>
      language === 'en'
        ? [
            {
              icon: <FiTarget />,
              title: 'Clear positioning',
              description:
                'The website explains what you do, who it is for, and why it matters without noise.'
            },
            {
              icon: <FiZap />,
              title: 'Premium execution',
              description:
                'Sharper layout, better rhythm, and a more intentional visual system across every section.'
            },
            {
              icon: <FiShield />,
              title: 'Operational depth',
              description:
                'CRM, automation, reporting, and handoff are considered from the start.'
            }
          ]
        : [
            {
              icon: <FiTarget />,
              title: 'تموضع واضح',
              description:
                'الموقع يشرح أنت بتقدم إيه، لمين، وليه مهم، من غير لف أو حشو.'
            },
            {
              icon: <FiZap />,
              title: 'تنفيذ premium',
              description:
                'توزيع بصري أنضف، إيقاع أحسن، وهوية أوضح في كل جزء من الصفحة.'
            },
            {
              icon: <FiShield />,
              title: 'عمق تشغيلي',
              description:
                'الأتمتة والـ CRM والتقارير والتسليم متفكر فيهم من أول مرحلة.'
            }
          ],
    [language]
  );

  const frameworkItems = useMemo(
    () =>
      language === 'en'
        ? [
            {
              icon: <FaShopify />,
              title: 'Company Websites & Shopify',
              description:
                'Profile websites, landing pages, stores, and conversion-ready interface systems.'
            },
            {
              icon: <FaHubspot />,
              title: 'Automation & CRM',
              description:
                'Lead routing, follow-up logic, approvals, and cleaner customer journeys.'
            },
            {
              icon: <FaDatabase />,
              title: 'Systems & Data',
              description:
                'Google Sheets operations, structured data entry, dashboards, and reporting layers.'
            },
            {
              icon: <FaRobot />,
              title: 'AI-Ready Workflow',
              description:
                'Practical AI support inside content, operations, and repetitive delivery tasks.'
            }
          ]
        : [
            {
              icon: <FaShopify />,
              title: 'مواقع الشركات وShopify',
              description:
                'مواقع بروفايل، لاندنج بيدج، متاجر، وأنظمة واجهات جاهزة للتحويل والبيع.'
            },
            {
              icon: <FaHubspot />,
              title: 'الأتمتة وCRM',
              description:
                'تأهيل العملاء، متابعة أوتوماتيك، موافقات، ومسارات تواصل أنضف مع العميل.'
            },
            {
              icon: <FaDatabase />,
              title: 'الأنظمة والبيانات',
              description:
                'تشغيل Google Sheets، إدخال بيانات منظم، لوحات متابعة، وطبقة تقارير واضحة.'
            },
            {
              icon: <FaRobot />,
              title: 'شغل جاهز للذكاء الاصطناعي',
              description:
                'دعم عملي للذكاء الاصطناعي داخل المحتوى والتشغيل والمهام المتكررة.'
            }
          ],
    [language]
  );

  const heroTitle = getLocalizedText(content?.hero?.title, language, copy.heroTitleFallback);
  const heroSubtitle = getLocalizedText(
    content?.hero?.subtitle,
    language,
    copy.heroSubtitleFallback
  );

  const siteName = content?.siteInfo?.siteName || '4 Pixels';
  const featuredProjects = useMemo(() => {
    const pinned = projects.filter((project) => project.featured);
    return (pinned.length > 0 ? pinned : projects).slice(0, 4);
  }, [projects]);

  const leadProject = featuredProjects[0] || null;
  const sideProjects = featuredProjects.slice(1, 4);

  const metrics = useMemo(
    () => [
      {
        value: `${Math.max(projects.length, 18)}+`,
        label: language === 'en' ? 'Projects shipped' : 'مشروع تم تنفيذه',
        icon: <FiLayers />
      },
      {
        value: `${Math.max(services.length, 3)}`,
        label: language === 'en' ? 'Core offers' : 'مسارات خدمة',
        icon: <FiZap />
      },
      {
        value: `${Math.max(reviews.length, 10)}+`,
        label: language === 'en' ? 'Client signals' : 'إشارات ثقة',
        icon: <FiShield />
      },
      {
        value: '48h',
        label: language === 'en' ? 'Kickoff speed' : 'جاهزية البداية',
        icon: <FiClock />
      }
    ],
    [language, projects.length, reviews.length, services.length]
  );

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-glow home-hero-glow-a" aria-hidden="true" />
        <div className="home-hero-glow home-hero-glow-b" aria-hidden="true" />
        <div className="home-hero-grid" aria-hidden="true" />

        <div className="container home-hero-layout">
          <motion.div
            className="home-hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{heroTitle}</h1>
            <p className="home-hero-subtitle">{heroSubtitle}</p>
            <div className="home-hero-note">{copy.heroNote}</div>

            <div className="home-hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                {copy.primaryCta}
                <FiArrowRight />
              </Link>
              <Link to="/projects" className="btn btn-outline btn-lg">
                {copy.secondaryCta}
              </Link>
            </div>

            <ul className="home-hero-checklist">
              {copy.heroChecklist.map((item) => (
                <li key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="home-hero-tags">
              {copy.heroTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className="home-hero-panel"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="home-panel-top">
              <div>
                <span className="home-panel-kicker">{copy.boardEyebrow}</span>
                <h2>{copy.boardTitle}</h2>
              </div>
              <span className="home-panel-status">{copy.boardStatus}</span>
            </div>

            <p className="home-panel-text">{copy.boardText}</p>

            <div className="home-panel-stats">
              {copy.boardStats.map((item) => (
                <article key={item.label} className="home-panel-stat">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="home-panel-steps">
              {copy.boardSteps.map((step, index) => (
                <article key={step.title} className="home-panel-step">
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-panel-footer">
              <div className="home-panel-brand">
                <span>{siteName}</span>
                <p>{copy.boardEyebrow}</p>
              </div>

              <div className="home-panel-tags">
                {copy.boardTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="container">
          <div className="home-proof-grid">
            {metrics.map((metric) => (
              <motion.article
                key={metric.label}
                className="home-proof-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.35 }}
              >
                <div className="home-proof-icon">{metric.icon}</div>
                <div>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {error ? (
        <section className="home-feedback">
          <div className="container">
            <p>{error}</p>
          </div>
        </section>
      ) : null}

      <section className="section home-positioning">
        <div className="container">
          <div className="section-copy home-section-copy">
            <span className="page-eyebrow">{copy.storyEyebrow}</span>
            <h2>{copy.storyTitle}</h2>
            <p>{copy.storyText}</p>
          </div>

          <div className="home-positioning-layout">
            <motion.article className="home-story-card" {...revealUp}>
              <p>{copy.storyText}</p>

              <ul className="home-story-list">
                {copy.storyPoints.map((item) => (
                  <li key={item}>
                    <FiCheckCircle />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <div className="home-principles-wrap">
              <div className="home-principles-head">
                <h3>{copy.principlesTitle}</h3>
              </div>

              <div className="home-principles-grid">
                {principleItems.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="home-principle-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="home-principle-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          <motion.div className="home-framework-block" {...revealUp}>
            <div className="section-copy home-framework-copy">
              <span className="page-eyebrow">{copy.frameworkEyebrow}</span>
              <h2>{copy.frameworkTitle}</h2>
              <p>{copy.frameworkSubtitle}</p>
            </div>

            <div className="home-framework-grid">
              {frameworkItems.map((item) => (
                <article key={item.title} className="home-framework-card">
                  <div className="home-framework-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section home-services">
        <div className="container">
          <div className="section-copy home-section-copy">
            <span className="page-eyebrow">{copy.servicesEyebrow}</span>
            <h2>{copy.servicesTitle}</h2>
            <p>{copy.servicesSubtitle}</p>
          </div>

          {services.length > 0 ? (
            <div className="home-services-grid">
              {services.map((service, index) => {
                const title = getLocalizedText(service.title, language, 'Service');
                const description = getLocalizedText(service.description, language);
                const features = getLocalizedArray(service.features, language).slice(0, 3);

                return (
                  <motion.article
                    key={service.id}
                    className="home-service-card"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.24 }}
                    transition={{ delay: index * 0.08 }}
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
                      <Link to={`/services/${service.id}`} className="home-inline-link">
                        {copy.serviceDetails}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <p className="home-empty-state">{copy.emptyServices}</p>
          )}

          <div className="home-section-action">
            <Link to="/services" className="btn btn-outline">
              {copy.servicesCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-copy home-section-copy">
            <span className="page-eyebrow">{copy.projectsEyebrow}</span>
            <h2>{copy.projectsTitle}</h2>
            <p>{copy.projectsSubtitle}</p>
          </div>

          {leadProject ? (
            <div className="home-projects-layout">
              <motion.article className="home-project-spotlight" {...revealUp}>
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
                    {(leadProject.tags || []).slice(0, 3).map((tag) => (
                      <span key={`${leadProject.id}-${tag}`}>{tag}</span>
                    ))}
                  </div>

                  <Link to={`/projects/${leadProject.id}`} className="home-inline-link">
                    {copy.projectCaseStudy}
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>

              <div className="home-project-list">
                <div className="home-project-list-head">
                  <h3>{copy.moreProjects}</h3>
                  <Link to="/projects" className="home-inline-link">
                    {copy.viewAllProjects}
                    <FiArrowRight />
                  </Link>
                </div>

                {sideProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    className="home-project-mini"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ delay: index * 0.08 }}
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
                      <Link to={`/projects/${project.id}`} className="home-inline-link">
                        {copy.projectCaseStudy}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ) : (
            <p className="home-empty-state">{copy.emptyProjects}</p>
          )}
        </div>
      </section>

      <section className="section home-reviews">
        <div className="container">
          <div className="section-copy home-section-copy">
            <span className="page-eyebrow">{copy.reviewsEyebrow}</span>
            <h2>{copy.reviewsTitle}</h2>
            <p>{copy.reviewsSubtitle}</p>
          </div>

          <div className="home-reviews-grid">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  className="home-review-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="home-review-head">
                    <img
                      src={review.image}
                      alt={getLocalizedText(review.name, language, 'Client')}
                      loading="lazy"
                    />
                    <div>
                      <h3>{getLocalizedText(review.name, language)}</h3>
                      <div className="home-review-rating" aria-label={`${review.rating || 5} stars`}>
                        {Array.from({ length: review.rating || 5 }, (_, starIndex) => (
                          <FiStar key={starIndex} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{getLocalizedText(review.text, language)}</p>
                </motion.article>
              ))
            ) : (
              <p className="home-empty-state">{copy.noReviews}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <div className="container">
          <motion.div className="home-cta-card" {...revealUp}>
            <div className="home-cta-copy">
              <span className="page-eyebrow">{copy.finalEyebrow}</span>
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
