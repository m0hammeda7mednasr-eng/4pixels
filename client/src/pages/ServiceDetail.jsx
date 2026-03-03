import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiDollarSign, FiPackage } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const copy = language === 'en'
    ? {
      loading: 'Loading service details...',
      notFoundTitle: 'Service Not Found',
      notFoundDescription: 'The service you are looking for does not exist.',
      backToServices: 'Back to Services',
      back: 'Back',
      whatsIncluded: "What's Included",
      faq: 'Frequently Asked Questions',
      startingAt: 'Starting at',
      deliveryTime: 'Delivery Time',
      getStarted: 'Get Started',
      customQuote: 'Contact us for a custom quote tailored to your needs',
      whyChooseUs: 'Why Choose Us?',
      quality: 'Professional Quality',
      onTime: 'On-Time Delivery',
      support: '24/7 Support',
      guarantee: 'Money-Back Guarantee'
    }
    : {
      loading: 'جارٍ تحميل تفاصيل الخدمة...',
      notFoundTitle: 'الخدمة غير موجودة',
      notFoundDescription: 'الخدمة التي تبحث عنها غير متاحة.',
      backToServices: 'العودة للخدمات',
      back: 'رجوع',
      whatsIncluded: 'ما تتضمنه الخدمة',
      faq: 'الأسئلة الشائعة',
      startingAt: 'تبدأ من',
      deliveryTime: 'وقت التسليم',
      getStarted: 'ابدأ الآن',
      customQuote: 'تواصل معنا للحصول على عرض سعر مخصص يناسب احتياجاتك',
      whyChooseUs: 'لماذا تختارنا؟',
      quality: 'جودة احترافية',
      onTime: 'تسليم في الوقت المحدد',
      support: 'دعم على مدار الساعة',
      guarantee: 'ضمان استرداد الأموال'
    };

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/services/${id}`);
        setService(response.data);
      } catch (err) {
        console.error('Error fetching service:', err.userMessage || err.message);
        setError('service-not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="service-detail-loading">
        <div className="spinner"></div>
        <p>{copy.loading}</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-error">
        <h2>{copy.notFoundTitle}</h2>
        <p>{copy.notFoundDescription}</p>
        <Link to="/services" className="btn btn-primary">
          <FiArrowLeft /> {copy.backToServices}
        </Link>
      </div>
    );
  }

  const title = service.title?.[language] || service.title?.en || '';
  const description = service.description?.[language] || service.description?.en || '';
  const features = service.features?.[language] || service.features?.en || [];
  const faq = Array.isArray(service.faq) ? service.faq : [];

  return (
    <div className="service-detail">
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

        <div className="service-detail-content">
          <motion.div
            className="service-main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="service-header">
              <h1>{title}</h1>
              <p className="service-subtitle">{description}</p>
            </div>

            {service.image && (
              <motion.div
                className="service-media"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src={service.image} alt={title} />
              </motion.div>
            )}

            {service.video && (
              <motion.div
                className="service-media"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <iframe
                  src={service.video}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )}

            <motion.div
              className="service-features-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>
                <FiPackage /> {copy.whatsIncluded}
              </h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <FiCheck className="feature-icon" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {faq.length > 0 && (
              <motion.div
                className="service-faq-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2>{copy.faq}</h2>
                <div className="faq-list">
                  {faq.map((item, index) => (
                    <div key={index} className="faq-item">
                      <h3>{item.question?.[language] || item.question?.en}</h3>
                      <p>{item.answer?.[language] || item.answer?.en}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="service-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="price-card">
              <div className="price-header">
                <FiDollarSign className="price-icon" />
                <div>
                  <p className="price-label">{copy.startingAt}</p>
                  <h2 className="price-amount">${service.price}</h2>
                </div>
              </div>

              <div className="price-details">
                <div className="price-detail-item">
                  <FiClock />
                  <div>
                    <strong>{copy.deliveryTime}</strong>
                    <p>{service.deliveryTime}</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-block">
                {copy.getStarted}
              </Link>

              <p className="price-note">{copy.customQuote}</p>
            </div>

            <div className="why-choose-card">
              <h3>{copy.whyChooseUs}</h3>
              <ul>
                <li>
                  <FiCheck />
                  {copy.quality}
                </li>
                <li>
                  <FiCheck />
                  {copy.onTime}
                </li>
                <li>
                  <FiCheck />
                  {copy.support}
                </li>
                <li>
                  <FiCheck />
                  {copy.guarantee}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
