import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiUser
} from 'react-icons/fi';
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLanguage } from '../context/LanguageContext';
import api, { getCached } from '../services/api';
import { getLocalizedText } from '../utils/localization';
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
  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchData = async () => {
      try {
        const [contentData, servicesData] = await Promise.all([
          getCached('/content', { ttl: 60000, signal: controller.signal }),
          getCached('/services', { ttl: 120000, signal: controller.signal })
        ]);

        if (!mounted) {
          return;
        }

        setContent(contentData || null);
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Error fetching contact data:', err.userMessage || err.message);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const copy =
    language === 'en'
      ? {
          headline: 'Let’s Build Your Next Digital System',
          intro:
            'Tell us your goals and we will design the right Shopify, automation, CRM, or AI-media execution plan.',
          methodEmail: 'Email',
          methodPhone: 'Phone',
          methodWhatsapp: 'WhatsApp',
          methodLocation: 'Location',
          connectTitle: 'Connect With Us',
          connectDescription:
            'Follow our channels for new launches, workflows, and client execution stories.',
          contactFormTitle: 'Send Project Brief',
          selectServicePlaceholder: 'Select a service',
          messageHint: 'Describe what you want to build, automate, or improve...',
          sending: 'Sending...',
          sentSuccess: 'Message sent successfully. We will contact you soon.',
          sendFail: 'Failed to send message. Please try again.',
          locationTitle: 'Where We Operate',
          locationSubtitle: 'Cairo, Egypt'
        }
      : {
          headline: 'جاهز نبني نظامك الرقمي القادم؟',
          intro:
            'شاركنا أهدافك وسنصمم لك خطة تنفيذ مناسبة في Shopify أو الأتمتة أو CRM أو الميديا بالذكاء الاصطناعي.',
          methodEmail: 'البريد',
          methodPhone: 'الهاتف',
          methodWhatsapp: 'واتساب',
          methodLocation: 'العنوان',
          connectTitle: 'تابعنا',
          connectDescription:
            'تابع قنواتنا لتعرف آخر الإطلاقات وتدفقات العمل وقصص التنفيذ مع العملاء.',
          contactFormTitle: 'أرسل ملخص مشروعك',
          selectServicePlaceholder: 'اختر الخدمة',
          messageHint: 'اكتب المطلوب تنفيذه أو أتمتته أو تحسينه بالتفصيل...',
          sending: 'جاري الإرسال...',
          sentSuccess: 'تم إرسال الرسالة بنجاح، وسنتواصل معك قريبًا.',
          sendFail: 'فشل إرسال الرسالة. حاول مرة أخرى.',
          locationTitle: 'نطاق عملنا',
          locationSubtitle: 'القاهرة، مصر'
        };

  const siteInfo = content?.siteInfo || {};
  const socialMedia = content?.socialMedia || {};

  const contactMethods = useMemo(
    () => [
      {
        icon: <FiMail />,
        title: copy.methodEmail,
        value: siteInfo.email || 'info@4pixels.com',
        link: siteInfo.email ? `mailto:${siteInfo.email}` : 'mailto:info@4pixels.com'
      },
      {
        icon: <FiPhone />,
        title: copy.methodPhone,
        value: siteInfo.phone || '+20 106 618 4859',
        link: siteInfo.phone ? `tel:${siteInfo.phone.replace(/\s+/g, '')}` : 'tel:+201066184859'
      },
      {
        icon: <FaWhatsapp />,
        title: copy.methodWhatsapp,
        value: siteInfo.whatsapp || '+201066184859',
        link: siteInfo.whatsapp
          ? `https://wa.me/${siteInfo.whatsapp.replace(/[^\d]/g, '')}`
          : 'https://wa.me/201066184859'
      },
      {
        icon: <FiMapPin />,
        title: copy.methodLocation,
        value: siteInfo.address || copy.locationSubtitle,
        link: null
      }
    ],
    [copy.locationSubtitle, copy.methodEmail, copy.methodLocation, copy.methodPhone, copy.methodWhatsapp, siteInfo.address, siteInfo.email, siteInfo.phone, siteInfo.whatsapp]
  );

  const socialLinks = useMemo(() => {
    const candidates = [
      { key: 'facebook', label: 'Facebook', icon: <FaFacebook />, color: '#1877F2' },
      { key: 'instagram', label: 'Instagram', icon: <FaInstagram />, color: '#E4405F' },
      { key: 'twitter', label: 'X', icon: <FaXTwitter />, color: '#111111' },
      { key: 'linkedin', label: 'LinkedIn', icon: <FaLinkedin />, color: '#0A66C2' },
      { key: 'github', label: 'GitHub', icon: <FaGithub />, color: '#181717' },
      { key: 'youtube', label: 'YouTube', icon: <FaYoutube />, color: '#FF0000' },
      { key: 'tiktok', label: 'TikTok', icon: <FaTiktok />, color: '#000000' },
      { key: 'behance', label: 'Behance', icon: <FaBehance />, color: '#1769FF' },
      { key: 'dribbble', label: 'Dribbble', icon: <FaDribbble />, color: '#EA4C89' }
    ];

    return candidates.filter((item) => Boolean(socialMedia[item.key]));
  }, [socialMedia]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error(language === 'en' ? 'Please enter your name' : 'يرجى إدخال الاسم');
      return;
    }

    if (!formData.email.trim()) {
      toast.error(language === 'en' ? 'Please enter your email' : 'يرجى إدخال البريد الإلكتروني');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(language === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      toast.error(
        language === 'en'
          ? 'Message must be at least 10 characters'
          : 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل'
      );
      return;
    }

    setLoading(true);
    try {
      await api.post('/messages', formData);
      toast.success(copy.sentSuccess);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (err) {
      toast.error(err.userMessage || copy.sendFail);
    } finally {
      setLoading(false);
    }
  };

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
          <h2>{copy.headline}</h2>
          <p>{copy.intro}</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="contact-methods-grid">
              {contactMethods.map((method, index) => (
                <motion.article
                  key={method.title}
                  className="contact-method"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="contact-method-header">
                    <div className="contact-icon">{method.icon}</div>
                    <h3>{method.title}</h3>
                  </div>
                  {method.link ? (
                    <a href={method.link} target="_blank" rel="noopener noreferrer" className="contact-link">
                      {method.value}
                    </a>
                  ) : (
                    <p>{method.value}</p>
                  )}
                </motion.article>
              ))}
            </div>

            <motion.div
              className="social-media-section"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="contact-method-header">
                <div className="contact-icon">
                  <FiMessageSquare />
                </div>
                <h3>{copy.connectTitle}</h3>
              </div>
              <p>{copy.connectDescription}</p>

              <div className="social-links-grid">
                {socialLinks.length > 0 ? (
                  socialLinks.map((social, index) => (
                    <motion.a
                      key={social.key}
                      href={socialMedia[social.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-card"
                      style={{ '--social-color': social.color }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + index * 0.04 }}
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.label}</span>
                    </motion.a>
                  ))
                ) : (
                  <p className="social-empty">
                    {language === 'en'
                      ? 'No social links added yet. You can add them from the admin dashboard.'
                      : 'لا توجد روابط سوشيال مضافة حاليًا. يمكنك إضافتها من لوحة الأدمن.'}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>{copy.contactFormTitle}</h2>

              <div className="form-group">
                <label htmlFor="name">
                  <FiUser /> {t('name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
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
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <FiPhone /> {t('phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">
                    <FiBriefcase /> {t('company')}
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">{t('selectService')}</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(event) => setFormData({ ...formData, service: event.target.value })}
                >
                  <option value="">{copy.selectServicePlaceholder}</option>
                  {services.map((service) => (
                    <option key={service.id} value={getLocalizedText(service.title, language)}>
                      {getLocalizedText(service.title, language)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('message')}</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  required
                  minLength={10}
                  maxLength={2000}
                  placeholder={copy.messageHint}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span>{loading ? copy.sending : t('sendMessage')}</span>
                <FiMessageSquare />
              </button>
            </form>
          </motion.div>
        </div>

        <motion.section
          className="map-section"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2>{copy.locationTitle}</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <FiMapPin className="map-pin-icon" />
              <h3>{siteInfo.address || copy.locationSubtitle}</h3>
              <p>{siteInfo.siteName || '4Pixels'}</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
