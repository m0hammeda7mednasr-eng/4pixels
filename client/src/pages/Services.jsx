import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock, FiFilter } from 'react-icons/fi';
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

  const copy = language === 'en'
    ? {
        intro:
          'From strategy to execution, our service stack is designed for measurable growth.',
        services: 'Services',
        categories: 'Categories',
        startingFrom: 'Starting from',
        filterByCategory: 'Filter by category',
        allServices: 'All services',
        discoverService: 'Discover service',
        swipeHint: 'Swipe to see more',
        emptyState: 'No services found for this category.'
      }
    : {
        intro:
          'من الاستراتيجية إلى التنفيذ، باقاتنا مصممة لتحقيق نمو قابل للقياس.',
        services: 'الخدمات',
        categories: 'التصنيفات',
        startingFrom: 'تبدأ من',
        filterByCategory: 'تصفية حسب التصنيف',
        allServices: 'كل الخدمات',
        discoverService: 'استكشف الخدمة',
        swipeHint: 'اسحب لرؤية المزيد',
        emptyState: 'لا توجد خدمات ضمن هذا التصنيف حاليًا.'
      };

  return (
    <div className="services-showcase section">
      <div className="services-backdrop services-backdrop-1" />
      <div className="services-backdrop services-backdrop-2" />

      <div className="container">
        <div className="services-showcase-header">
          <h1 className="section-title">{t('services')}</h1>
          <p>{copy.intro}</p>
        </div>

        {error && <p className="scroll-indicator">{error}</p>}

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
          <div className="services-showcase-loading">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="services-showcase-grid">
              {filteredServices.map((service, index) => {
                const features = getLocalizedArray(service.features, language);
                const title = getLocalizedText(service.title, language, 'Service');
                const description = getLocalizedText(service.description, language);

                return (
                  <motion.article
                    key={service.id}
                    className="services-showcase-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="services-showcase-top">
                      <span className="service-category">
                        {getCategoryLabel(service.category, language) || 'General'}
                      </span>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>

                    <ul className="service-features">
                      {features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={`${service.id}-feature-${featureIndex}`}>
                          <FiCheckCircle />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="services-showcase-footer">
                      <div className="service-price-group">
                        <strong>${service.price}</strong>
                        <span>
                          <FiClock />
                          {service.deliveryTime}
                        </span>
                      </div>

                      <Link to={`/services/${service.id}`}>
                        {copy.discoverService}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {filteredServices.length > 0 && (
              <p className="scroll-indicator">
                {language === 'en' ? `← ${copy.swipeHint} →` : `→ ${copy.swipeHint} ←`}
              </p>
            )}

            {!filteredServices.length && (
              <div className="services-empty-state">
                <p>{copy.emptyState}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
