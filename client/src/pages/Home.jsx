import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiMongodb, SiShopify } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './Home.css';
import './HeroCompact.css';

const Home = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, reviewsRes] = await Promise.all([
          api.get('/services'),
          api.get('/projects'),
          api.get('/reviews')
        ]);
        setServices(servicesRes.data.slice(0, 3));
        setProjects(projectsRes.data.slice(0, 6));
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { number: '150+', label: { en: 'Projects Completed', ar: 'مشروع مكتمل' } },
    { number: '50+', label: { en: 'Happy Clients', ar: 'عميل سعيد' } },
    { number: '5+', label: { en: 'Years Experience', ar: 'سنوات خبرة' } },
    { number: '24/7', label: { en: 'Support', ar: 'دعم فني' } },
  ];

  return (
    <div className="home">
      {/* Hero Section - Compact 550px */}
      <motion.section 
        className="hero-compact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background with Floating Tech Icons */}
        <div className="hero-compact-bg">
          <motion.div 
            className="bg-circle bg-circle-1"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="bg-circle bg-circle-2"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Tech Icons */}
          <motion.div 
            className="floating-tech-icon tech-icon-1"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiReact />
          </motion.div>
          
          <motion.div 
            className="floating-tech-icon tech-icon-2"
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <SiNodedotjs />
          </motion.div>
          
          <motion.div 
            className="floating-tech-icon tech-icon-3"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 12, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <SiPython />
          </motion.div>
          
          <motion.div 
            className="floating-tech-icon tech-icon-4"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <SiJavascript />
          </motion.div>
          
          <motion.div 
            className="floating-tech-icon tech-icon-5"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <SiMongodb />
          </motion.div>
          
          <motion.div 
            className="floating-tech-icon tech-icon-6"
            animate={{ 
              y: [0, 22, 0],
              rotate: [0, -12, 0]
            }}
            transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          >
            <SiShopify />
          </motion.div>
        </div>

        <div className="container hero-compact-wrapper">
          <div className="hero-compact-content">
            {/* Title */}
            <motion.h1
              className="hero-compact-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {language === 'en' 
                ? 'Transform Your Digital Vision Into Reality'
                : 'حوّل رؤيتك الرقمية إلى واقع'
              }
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-compact-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {language === 'en' 
                ? 'We craft exceptional digital experiences that drive growth and innovation for forward-thinking businesses worldwide.'
                : 'نصنع تجارب رقمية استثنائية تدفع النمو والابتكار للشركات الطموحة حول العالم.'
              }
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="hero-compact-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/contact" className="btn-compact btn-compact-primary">
                <span>{language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}</span>
                <FiArrowRight />
              </Link>
              
              <Link to="/projects" className="btn-compact btn-compact-secondary">
                <FiEye />
                <span>{language === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}</span>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="hero-compact-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-compact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                >
                  <div className="stat-compact-number">{stat.number}</div>
                  <div className="stat-compact-label">{stat.label[language]}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t('services')}</h2>
            <p className="section-subtitle">
              {language === 'en' 
                ? 'We provide comprehensive digital solutions to transform your business'
                : 'نقدم حلولاً رقمية شاملة لتحويل أعمالك'
              }
            </p>
          </motion.div>
          
          {/* Horizontal Scrollable Services */}
          <div className="services-scroll-container">
            <div className="services-scroll-wrapper">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="service-card-horizontal"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {service.image && (
                    <div className="service-image-horizontal">
                      <img 
                        src={service.image} 
                        alt={service.title[language]}
                      />
                    </div>
                  )}
                  <div className="service-content-horizontal">
                    <h3>{service.title[language]}</h3>
                    <p className="service-description">{service.description[language]}</p>
                    <div className="service-price">${service.price}</div>
                    <p className="service-delivery">
                      <strong>{language === 'en' ? 'Delivery:' : 'التسليم:'}</strong> {service.deliveryTime}
                    </p>
                    <Link to={`/services/${service.id}`} className="btn btn-primary">
                      {language === 'en' ? 'Learn More' : 'المزيد'}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="section projects-preview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t('projects')}</h2>
            <p className="text-center" style={{ maxWidth: '700px', margin: '0 auto 50px', color: 'var(--text-light-secondary)' }}>
              {language === 'en' 
                ? 'Explore our portfolio of successful projects across various industries'
                : 'استكشف محفظة مشاريعنا الناجحة عبر مختلف الصناعات'
              }
            </p>
          </motion.div>
          {/* Horizontal Scrollable Projects */}
          <div className="projects-scroll-container">
            <div className="projects-scroll-wrapper">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card-horizontal"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {project.images?.[0] && (
                    <div className="project-image-horizontal">
                      <img src={project.images[0]} alt={project.title[language]} />
                    </div>
                  )}
                  <div className="project-overlay-horizontal">
                    <h3>{project.title[language]}</h3>
                    <p className="project-category">{project.category}</p>
                    <Link to={`/projects/${project.id}`} className="btn btn-primary">
                      {language === 'en' ? 'View Details' : 'التفاصيل'}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              {language === 'en' ? 'Customer Reviews' : 'آراء العملاء'}
            </h2>
          </motion.div>

          <div className="reviews-scroll-container">
            <div className="reviews-scroll-wrapper">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="review-card"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="review-image-box">
                    <img src={review.image} alt={review.name[language]} />
                    <div className="stars-floating">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="review-content">
                    <div className="review-author">
                      <span className="author-name">{review.name[language]}</span>
                      {review.verified && <div className="verified-badge">✓</div>}
                    </div>
                    <p className="review-text">{review.text[language]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
