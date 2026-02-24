import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaBehance, FaDribbble } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './Footer.css';

const Footer = () => {
  const { t, language } = useLanguage();
  const [openSection, setOpenSection] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (err) {
      console.error('Failed to fetch content:', err);
    }
  };

  const services = [
    { name: { en: 'Web Development', ar: 'تطوير المواقع' }, link: '/services' },
    { name: { en: 'Mobile Apps', ar: 'تطبيقات الجوال' }, link: '/services' },
    { name: { en: 'Digital Marketing', ar: 'التسويق الرقمي' }, link: '/services' },
    { name: { en: 'UI/UX Design', ar: 'تصميم واجهات المستخدم' }, link: '/services' },
  ];

  const company = [
    { name: { en: 'About Us', ar: 'من نحن' }, link: '/about' },
    { name: { en: 'Projects', ar: 'المشاريع' }, link: '/projects' },
    { name: { en: 'Contact', ar: 'التواصل' }, link: '/contact' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, name: 'Facebook', key: 'facebook', color: '#1877F2' },
    { icon: <FaInstagram />, name: 'Instagram', key: 'instagram', color: '#E4405F' },
    { icon: <FaXTwitter />, name: 'Twitter', key: 'twitter', color: '#000000' },
    { icon: <FaLinkedin />, name: 'LinkedIn', key: 'linkedin', color: '#0A66C2' },
    { icon: <FaGithub />, name: 'GitHub', key: 'github', color: '#181717' },
    { icon: <FaYoutube />, name: 'YouTube', key: 'youtube', color: '#FF0000' },
    { icon: <FaTiktok />, name: 'TikTok', key: 'tiktok', color: '#000000' },
    { icon: <FaBehance />, name: 'Behance', key: 'behance', color: '#1769FF' },
    { icon: <FaDribbble />, name: 'Dribbble', key: 'dribbble', color: '#EA4C89' },
  ].filter(social => content?.socialMedia?.[social.key]); // Only show if URL exists

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section footer-main"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo-section">
              <div className="footer-logo-container">
                <h3 className="footer-logo-text">{content?.siteInfo?.siteName || '4Pixels'}</h3>
              </div>
              <p className="footer-tagline">{content?.siteInfo?.tagline || 'Digital Agency'}</p>
            </div>
            <p className="footer-description">
              {content?.siteInfo?.description || (language === 'en' 
                ? 'Transforming digital experiences with cutting-edge solutions.'
                : 'نحوّل التجارب الرقمية بحلول متطورة.')}
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={content?.socialMedia?.[social.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Desktop Sections */}
          <div className="footer-sections-desktop">
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4>{language === 'en' ? 'Services' : 'الخدمات'}</h4>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name[language]}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={service.link}>{service.name[language]}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4>{language === 'en' ? 'Company' : 'الشركة'}</h4>
              <ul className="footer-links">
                {company.map((item, index) => (
                  <motion.li
                    key={item.name[language]}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={item.link}>{item.name[language]}</Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mobile Dropdowns */}
          <div className="footer-sections-mobile">
            <div className="footer-dropdown">
              <button 
                className="footer-dropdown-btn"
                onClick={() => toggleSection('services')}
              >
                <span>{language === 'en' ? 'Services' : 'الخدمات'}</span>
                <FiChevronDown className={openSection === 'services' ? 'rotate' : ''} />
              </button>
              <AnimatePresence>
                {openSection === 'services' && (
                  <motion.ul
                    className="footer-dropdown-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {services.map((service) => (
                      <li key={service.name[language]}>
                        <Link to={service.link}>{service.name[language]}</Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="footer-dropdown">
              <button 
                className="footer-dropdown-btn"
                onClick={() => toggleSection('company')}
              >
                <span>{language === 'en' ? 'Company' : 'الشركة'}</span>
                <FiChevronDown className={openSection === 'company' ? 'rotate' : ''} />
              </button>
              <AnimatePresence>
                {openSection === 'company' && (
                  <motion.ul
                    className="footer-dropdown-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {company.map((item) => (
                      <li key={item.name[language]}>
                        <Link to={item.link}>{item.name[language]}</Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <motion.div 
            className="copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {new Date().getFullYear()} {content?.siteInfo?.siteName || '4Pixels'}. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;