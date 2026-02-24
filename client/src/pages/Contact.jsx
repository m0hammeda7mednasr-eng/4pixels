import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser, FiBriefcase } from 'react-icons/fi';
import { FaWhatsapp, FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import './Contact.css';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim()) {
      toast.error(language === 'en' ? 'Please enter your name' : 'الرجاء إدخال اسمك');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error(language === 'en' ? 'Please enter your email' : 'الرجاء إدخال بريدك الإلكتروني');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(language === 'en' ? 'Please enter a valid email' : 'الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error(language === 'en' ? 'Please enter your message' : 'الرجاء إدخال رسالتك');
      return;
    }
    
    if (formData.message.trim().length < 10) {
      toast.error(language === 'en' ? 'Message must be at least 10 characters' : 'يجب أن تكون الرسالة 10 أحرف على الأقل');
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/messages', formData);
      toast.success(language === 'en' ? 'Message sent successfully! We\'ll get back to you soon.' : 'تم إرسال الرسالة بنجاح! سنرد عليك قريبًا.');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || (language === 'en' ? 'Failed to send message. Please try again.' : 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.');
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail />,
      title: { en: 'Email Us', ar: 'راسلنا عبر البريد' },
      description: { en: 'Send us an email and we\'ll get back to you within 24 hours', ar: 'أرسل لنا بريدًا إلكترونيًا وسنرد عليك خلال 24 ساعة' },
      link: 'mailto:info@fourpixels.com',
      linkText: 'info@fourpixels.com'
    },
    {
      icon: <FiPhone />,
      title: { en: 'Call Us', ar: 'اتصل بنا' },
      description: { en: 'Available Monday to Friday, 9 AM to 6 PM', ar: 'متاح من الإثنين إلى الجمعة، من 9 صباحًا إلى 6 مساءً' },
      link: 'tel:+201234567890',
      linkText: '+20 123 456 7890'
    },
    {
      icon: <FaWhatsapp />,
      title: { en: 'WhatsApp', ar: 'واتساب' },
      description: { en: 'Chat with us directly on WhatsApp for quick responses', ar: 'تحدث معنا مباشرة على واتساب للحصول على ردود سريعة' },
      link: 'https://wa.me/201234567890',
      linkText: 'Start Chat'
    },
    {
      icon: <FiMapPin />,
      title: { en: 'Visit Us', ar: 'زورنا' },
      description: { en: '123 Digital Street, Cairo, Egypt', ar: '123 شارع ديجيتال، القاهرة، مصر' },
      link: 'https://maps.google.com',
      linkText: 'View on Map'
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com/company/fourpixels', color: '#0A66C2' },
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com/fourpixels', color: '#181717' },
    { icon: <FaFacebook />, name: 'Facebook', url: 'https://facebook.com/fourpixels', color: '#1877F2' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://instagram.com/fourpixels', color: '#E4405F' },
    { icon: <FaTiktok />, name: 'TikTok', url: 'https://tiktok.com/@fourpixels', color: '#000000' },
    { icon: <FaYoutube />, name: 'YouTube', url: 'https://youtube.com/@fourpixels', color: '#FF0000' },
  ];

  const services = [
    { en: 'Web Development', ar: 'تطوير المواقع' },
    { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
    { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    { en: 'UI/UX Design', ar: 'تصميم واجهات المستخدم' },
    { en: 'Branding', ar: 'الهوية البصرية' },
  ];

  return (
    <div className="contact-page">
      <ToastContainer position="top-center" />
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>{t('contact')}</h1>
          <p>
            {language === 'en' 
              ? 'Get in touch with us. We\'re here to help you transform your digital presence.'
              : 'تواصل معنا. نحن هنا لمساعدتك في تحويل حضورك الرقمي.'
            }
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title[language]}
                className="contact-method"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="contact-method-header">
                  <div className="contact-icon">
                    {method.icon}
                  </div>
                  <h3>{method.title[language]}</h3>
                </div>
                <p>{method.description[language]}</p>
                <a href={method.link} target="_blank" rel="noopener noreferrer" className="contact-link">
                  {method.linkText}
                </a>
              </motion.div>
            ))}

            <motion.div 
              className="social-media-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="contact-method-header">
                <div className="contact-icon">
                  <FiMessageSquare />
                </div>
                <h3>{language === 'en' ? 'Connect With Us' : 'تواصل معنا'}</h3>
              </div>
              <p>
                {language === 'en' 
                  ? 'Follow us on social media for updates and insights'
                  : 'تابعنا على وسائل التواصل للحصول على التحديثات والأفكار'
                }
              </p>
              <div className="social-links-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                    style={{ '--social-color': social.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>{t('sendMessage')}</h2>
              
              <div className="form-group">
                <label htmlFor="name">
                  <FiUser /> {t('name')}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FiMail /> {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FiPhone /> {t('phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder=""
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">
                  <FiBriefcase /> {t('company')}
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder=""
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">{t('selectService')}</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="">{language === 'en' ? 'Select a service' : 'اختر خدمة'}</option>
                  {services.map((service) => (
                    <option key={service[language]} value={service[language]}>
                      {service[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('message')}</label>
                <textarea
                  id="message"
                  placeholder=""
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span>{loading ? (language === 'en' ? 'Sending...' : 'جاري الإرسال...') : t('sendMessage')}</span>
                <FiMessageSquare />
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div 
          className="map-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>{language === 'en' ? 'Our Location' : 'موقعنا'}</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <FiMapPin style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }} />
              <h3>{language === 'en' ? 'Cairo, Egypt' : 'القاهرة، مصر'}</h3>
              <p>123 Digital Street</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
