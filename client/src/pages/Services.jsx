import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiLayers,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { getCategoryLabel, PRIMARY_CATEGORIES } from '../utils/categoryLabels';
import { getLocalizedArray, getLocalizedText } from '../utils/localization';
import './Services.css';

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchServices = async () => {
      try {
        setError('');
        const data = await getCached('/services', { ttl: 120000, signal: controller.signal });

        if (!mounted) {
          return;
        }

        setServices(data || []);
      } catch (err) {
        if (controller.signal.aborted || !mounted) {
          return;
        }

        console.error('Error fetching services:', err.userMessage || err.message);
        setError(
          language === 'en'
            ? 'Could not load services at the moment.'
            : 'تعذر تحميل الخدمات في الوقت الحالي.'
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [language]);

  const categories = useMemo(() => {
    const availableCategories = Array.from(
      new Set(services.map((service) => service.category).filter(Boolean))
    );
    const orderedPrimary = PRIMARY_CATEGORIES.filter((category) =>
      availableCategories.includes(category)
    );
    const remainingCategories = availableCategories.filter(
      (category) => !PRIMARY_CATEGORIES.includes(category)
    );

    return ['all', ...orderedPrimary, ...remainingCategories];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') {
      return services;
    }

    return services.filter((service) => service.category === activeCategory);
  }, [services, activeCategory]);

  const summary = useMemo(() => {
    const prices = services
      .map((service) => Number(service.price))
      .filter((price) => Number.isFinite(price));

    return {
      count: services.length,
      categories: Math.max(categories.length - 1, 0),
      startingPrice: prices.length > 0 ? Math.min(...prices) : null
    };
  }, [services, categories]);

  const copy =
    language === 'en'
      ? {
          eyebrow: 'Execution Offers',
          intro:
            'Every service is designed to help a company launch faster, automate more, and operate with less friction.',
          sideTitle: 'What you get from every engagement',
          sidePoints: [
            'Clear delivery scope with business-focused priorities',
            'Premium UX direction and production-ready implementation',
            'Operational thinking that connects tools, teams, and reporting'
          ],
          sideCta: 'Request A Brief',
          services: 'Services',
          categories: 'Categories',
          startingFrom: 'Starting from',
          filterByCategory: 'Filter by category',
          allServices: 'All services',
          discoverService: 'Open service',
          emptyState: 'No services found for this category.',
          methodEyebrow: 'Delivery Model',
          methodTitle: 'A practical engagement flow, not vague consulting.',
          methodSubtitle:
            'We move from business context to implementation and then optimize for stability and growth.',
          methodSteps: [
            {
              title: 'Audit & Prioritize',
              description: 'We identify the highest-impact fixes, systems gaps, and execution constraints first.'
            },
            {
              title: 'Design & Build',
              description: 'The interface, systems, and automation layer are built together with launch quality in mind.'
            },
            {
              title: 'Measure & Improve',
              description: 'After launch, we refine reporting, speed, and operational reliability.'
            }
          ],
          finalTitle: 'Need a custom stack instead of a one-size-fits-all package?',
          finalText:
            'We can combine Shopify, automation, data, and UX into one scoped delivery plan for your exact business case.',
          finalCta: 'Talk To Us'
        }
      : {
          eyebrow: 'عروض التنفيذ',
          intro:
            'كل خدمة هنا مصممة لتساعد شركتك على الإطلاق أسرع، والأتمتة بشكل أذكى، والتشغيل باحتكاك أقل.',
          sideTitle: 'ماذا تحصل عليه في كل تنفيذ',
          sidePoints: [
            'نطاق عمل واضح مع أولويات مرتبطة بالأثر التجاري',
            'اتجاه UX احترافي وتنفيذ جاهز للإطلاق',
            'فكر تشغيلي يربط الأدوات والفريق والتقارير'
          ],
          sideCta: 'اطلب ملخصًا',
          services: 'الخدمات',
          categories: 'التصنيفات',
          startingFrom: 'تبدأ من',
          filterByCategory: 'فلترة حسب التصنيف',
          allServices: 'كل الخدمات',
          discoverService: 'عرض الخدمة',
          emptyState: 'لا توجد خدمات ضمن هذا التصنيف حاليًا.',
          methodEyebrow: 'أسلوب التنفيذ',
          methodTitle: 'مسار عمل عملي، وليس استشارات عامة بلا تنفيذ.',
          methodSubtitle:
            'نبدأ من فهم السياق التجاري ثم نبني ونحسن بعد الإطلاق للوصول إلى استقرار ونمو فعلي.',
          methodSteps: [
            {
              title: 'تحليل وتحديد الأولويات',
              description: 'نحدد أهم نقاط التحسين والفجوات التشغيلية والعوائق قبل البدء.'
            },
            {
              title: 'تصميم وبناء',
              description: 'ننفذ الواجهة والأنظمة والأتمتة بشكل متزامن مع جاهزية حقيقية للإطلاق.'
            },
            {
              title: 'قياس وتحسين',
              description: 'بعد التشغيل نرفع جودة التقارير والسرعة والاعتمادية التشغيلية.'
            }
          ],
          finalTitle: 'تحتاج Stack مخصص بدل باقة ثابتة؟',
          finalText:
            'يمكننا دمج Shopify والأتمتة والبيانات والـ UX داخل خطة تنفيذ واحدة تناسب حالتك بالضبط.',
          finalCta: 'تواصل معنا'
        };

  return (
    <div className="services-page section">
      <div className="services-page-orb orb-left" />
      <div className="services-page-orb orb-right" />

      <div className="container services-page-shell">
        <header className="services-hero">
          <div className="section-copy services-hero-copy">
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{t('services')}</h1>
            <p>{copy.intro}</p>
          </div>

          <aside className="services-hero-panel">
            <h2>{copy.sideTitle}</h2>
            <ul>
              {copy.sidePoints.map((item) => (
                <li key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">
              {copy.sideCta}
              <FiArrowRight />
            </Link>
          </aside>
        </header>

        {error ? <p className="services-error">{error}</p> : null}

        <div className="services-summary-grid">
          <article className="services-summary-card">
            <span>{copy.services}</span>
            <strong>{summary.count}</strong>
          </article>
          <article className="services-summary-card">
            <span>{copy.categories}</span>
            <strong>{summary.categories}</strong>
          </article>
          <article className="services-summary-card">
            <span>{copy.startingFrom}</span>
            <strong>{summary.startingPrice ? `$${summary.startingPrice}` : '--'}</strong>
          </article>
        </div>

        <div className="services-toolbar">
          <div className="services-toolbar-label">
            <FiFilter />
            {copy.filterByCategory}
          </div>

          <div className="services-category-list">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? copy.allServices : getCategoryLabel(category, language)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="services-loading">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="services-grid">
              {filteredServices.map((service, index) => {
                const features = getLocalizedArray(service.features, language).slice(0, 3);
                const title = getLocalizedText(service.title, language, 'Service');
                const description = getLocalizedText(service.description, language);

                return (
                  <motion.article
                    key={service.id}
                    className="services-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="services-card-top">
                      <span className="services-card-category">
                        {getCategoryLabel(service.category, language) || 'General'}
                      </span>
                      <strong>${service.price}</strong>
                    </div>

                    <h3>{title}</h3>
                    <p>{description}</p>

                    <ul className="services-card-features">
                      {features.map((feature) => (
                        <li key={`${service.id}-${feature}`}>
                          <FiCheckCircle />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="services-card-footer">
                      <span>
                        <FiClock />
                        {service.deliveryTime}
                      </span>
                      <Link to={`/services/${service.id}`}>
                        {copy.discoverService}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {!filteredServices.length ? (
              <div className="services-empty-state">
                <p>{copy.emptyState}</p>
              </div>
            ) : null}
          </>
        )}

        <section className="services-method">
          <div className="section-copy">
            <span className="page-eyebrow">{copy.methodEyebrow}</span>
            <h2>{copy.methodTitle}</h2>
            <p>{copy.methodSubtitle}</p>
          </div>

          <div className="services-method-grid">
            {copy.methodSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="services-method-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="services-method-icon">
                  {index === 0 ? <FiLayers /> : index === 1 ? <FiZap /> : <FiTrendingUp />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="services-final-card">
          <div>
            <h2>{copy.finalTitle}</h2>
            <p>{copy.finalText}</p>
          </div>

          <Link to="/contact" className="btn btn-outline">
            {copy.finalCta}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Services;
