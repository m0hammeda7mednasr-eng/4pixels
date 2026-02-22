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

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/services/${id}`);
        setService(response.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Service not found');
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
        <p>Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-error">
        <h2>Service Not Found</h2>
        <p>The service you're looking for doesn't exist.</p>
        <Link to="/services" className="btn btn-primary">
          <FiArrowLeft /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail">
      <div className="container">
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FiArrowLeft /> {language === 'en' ? 'Back' : 'رجوع'}
        </motion.button>

        <div className="service-detail-content">
          {/* Left Column - Main Content */}
          <motion.div
            className="service-main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Service Header */}
            <div className="service-header">
              <h1>{service.title[language]}</h1>
              <p className="service-subtitle">{service.description[language]}</p>
            </div>

            {/* Service Image/Video */}
            {service.image && (
              <motion.div
                className="service-media"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src={service.image} alt={service.title[language]} />
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
                  title={service.title[language]}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )}

            {/* Features Section */}
            <motion.div
              className="service-features-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>
                <FiPackage /> {language === 'en' ? 'What\'s Included' : 'ما يتضمنه'}
              </h2>
              <div className="features-grid">
                {service.features[language]?.map((feature, index) => (
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

            {/* FAQ Section */}
            {service.faq && service.faq.length > 0 && (
              <motion.div
                className="service-faq-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2>{language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}</h2>
                <div className="faq-list">
                  {service.faq.map((item, index) => (
                    <div key={index} className="faq-item">
                      <h3>{item.question[language]}</h3>
                      <p>{item.answer[language]}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            className="service-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Price Card */}
            <div className="price-card">
              <div className="price-header">
                <FiDollarSign className="price-icon" />
                <div>
                  <p className="price-label">{language === 'en' ? 'Starting at' : 'يبدأ من'}</p>
                  <h2 className="price-amount">${service.price}</h2>
                </div>
              </div>

              <div className="price-details">
                <div className="price-detail-item">
                  <FiClock />
                  <div>
                    <strong>{language === 'en' ? 'Delivery Time' : 'وقت التسليم'}</strong>
                    <p>{service.deliveryTime}</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-block">
                {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
              </Link>

              <p className="price-note">
                {language === 'en' 
                  ? 'Contact us for a custom quote tailored to your needs'
                  : 'تواصل معنا للحصول على عرض سعر مخصص يناسب احتياجاتك'
                }
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="why-choose-card">
              <h3>{language === 'en' ? 'Why Choose Us?' : 'لماذا تختارنا؟'}</h3>
              <ul>
                <li>
                  <FiCheck />
                  {language === 'en' ? 'Professional Quality' : 'جودة احترافية'}
                </li>
                <li>
                  <FiCheck />
                  {language === 'en' ? 'On-Time Delivery' : 'تسليم في الوقت المحدد'}
                </li>
                <li>
                  <FiCheck />
                  {language === 'en' ? '24/7 Support' : 'دعم على مدار الساعة'}
                </li>
                <li>
                  <FiCheck />
                  {language === 'en' ? 'Money-Back Guarantee' : 'ضمان استرداد الأموال'}
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
