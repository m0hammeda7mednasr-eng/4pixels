import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock, FiFilter } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { getCategoryLabel, PRIMARY_CATEGORIES } from '../utils/categoryLabels';
import './Services.css';

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data || []);
      } catch (err) {
        console.error('Error fetching services:', err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
    const prices = services.map((service) => Number(service.price)).filter((price) => Number.isFinite(price));
    return {
      count: services.length,
      categories: Math.max(categories.length - 1, 0),
      startingPrice: prices.length > 0 ? Math.min(...prices) : null
    };
  }, [services, categories]);

  return (
    <div className="services-showcase section">
      <div className="services-backdrop services-backdrop-1" />
      <div className="services-backdrop services-backdrop-2" />

      <div className="container">
        <div className="services-showcase-header">
          <h1 className="section-title">{t('services')}</h1>
          <p>
            {language === 'en'
              ? 'From strategy to execution, our service stack is designed for measurable growth.'
              : 'من الاستراتيجية إلى التنفيذ، باقاتنا مصممة لتحقيق نمو قابل للقياس.'}
          </p>
        </div>

        <div className="services-summary-grid">
          <article className="services-summary-card">
            <span>{language === 'en' ? 'Services' : 'الخدمات'}</span>
            <strong>{summary.count}</strong>
          </article>
          <article className="services-summary-card">
            <span>{language === 'en' ? 'Categories' : 'التصنيفات'}</span>
            <strong>{summary.categories}</strong>
          </article>
          <article className="services-summary-card">
            <span>{language === 'en' ? 'Starting from' : 'تبدأ من'}</span>
            <strong>{summary.startingPrice ? `$${summary.startingPrice}` : '--'}</strong>
          </article>
        </div>

        <div className="services-toolbar">
          <div className="services-toolbar-label">
            <FiFilter />
            {language === 'en' ? 'Filter by category' : 'تصفية حسب التصنيف'}
          </div>
          <div className="services-category-list">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all'
                  ? language === 'en'
                    ? 'All services'
                    : 'كل الخدمات'
                  : getCategoryLabel(category, language)}
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
                const features = service.features?.[language] || service.features?.en || [];

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
                      <h3>{service.title?.[language] || service.title?.en}</h3>
                      <p>{service.description?.[language] || service.description?.en}</p>
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
                        {language === 'en' ? 'Discover service' : 'استكشف الخدمة'}
                        <FiArrowRight />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {filteredServices.length > 0 && (
              <p className="scroll-indicator" style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-light-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
                {language === 'en' ? '← Swipe to see more →' : '→ اسحب لرؤية المزيد ←'}
              </p>
            )}

            {!filteredServices.length && (
              <div className="services-empty-state">
                <p>
                  {language === 'en'
                    ? 'No services found for this category.'
                    : 'لا توجد خدمات ضمن هذا التصنيف حاليًا.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
