import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './Services.css';

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page section">
      <div className="container">
        <h1 className="section-title">{t('services')}</h1>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {service.image && (
                <img 
                  src={service.image} 
                  alt={service.title[language]}
                />
              )}
              <h3>{service.title[language]}</h3>
              <p>{service.description[language]}</p>
              <div className="service-price">${service.price}</div>
              <p>
                <strong>{language === 'en' ? 'Delivery:' : 'التسليم:'}</strong> {service.deliveryTime}
              </p>
              <Link to={`/services/${service.id}`} className="btn btn-primary">
                {language === 'en' ? 'Learn More' : 'المزيد'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
