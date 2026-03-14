import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiTrendingUp,
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
          eyebrow: 'Start The Conversation',
          headline: 'Share the brief. We will shape the right execution path.',
          intro:
            'Whether you need a premium company website, Shopify build, automation flow, or a full systems layer, we can scope it clearly and move fast.',
          formTitle: 'Send project brief',
          formSubtitle:
            'The clearer the context, the faster we can recommend the right roadmap and estimate.',
          selectServicePlaceholder: 'Select a service',
          messageHint: 'Describe what you want to build, improve, or automate...',
          sending: 'Sending...',
          sentSuccess: 'Message sent successfully. We will contact you soon.',
          sendFail: 'Failed to send message. Please try again.',
          locationTitle: 'Where we coordinate from',
          locationSubtitle: 'Cairo, Egypt',
          responseHighlights: [
            { icon: <FiClock />, label: 'Reply within 24 business hours' },
            { icon: <FiLayers />, label: 'Clear scope before production starts' },
            { icon: <FiTrendingUp />, label: 'Built for launch quality and growth' }
          ],
          nextStepsTitle: 'What happens next',
          nextSteps: [
            'We review the brief and identify the right scope.',
            'You receive a practical response with next steps.',
            'If the fit is right, we move into discovery and delivery planning.'
          ],
          connectTitle: 'Follow our channels',
          connectDescription:
            'Use social channels for updates, launches, and behind-the-scenes execution work.',
          methodEmail: 'Email',
          methodPhone: 'Phone',
          methodWhatsapp: 'WhatsApp',
          methodLocation: 'Location',
          namePlaceholder: 'Your full name',
          emailPlaceholder: 'you@company.com',
          phonePlaceholder: '+20...',
          companyPlaceholder: 'Company or brand name',
          noSocial: 'No social links added yet. You can add them from the admin dashboard.'
        }
      : {
          eyebrow: 'ابدأ المحادثة',
          headline: 'شاركنا الملخص، وسنحدد لك مسار التنفيذ المناسب.',
          intro:
            'سواء كنت تحتاج موقع شركة premium أو متجر Shopify أو أتمتة أو طبقة أنظمة كاملة، يمكننا تحديد النطاق بوضوح والتحرك بسرعة.',
          formTitle: 'أرسل ملخص المشروع',
          formSubtitle:
            'كلما كان السياق أوضح، كان بإمكاننا اقتراح roadmap وتكلفة مبدئية بشكل أسرع.',
          selectServicePlaceholder: 'اختر خدمة',
          messageHint: 'اشرح ما الذي تريد بناءه أو تحسينه أو أتمتته...',
          sending: 'جارٍ الإرسال...',
          sentSuccess: 'تم إرسال الرسالة بنجاح، وسنتواصل معك قريبًا.',
          sendFail: 'فشل إرسال الرسالة. حاول مرة أخرى.',
          locationTitle: 'من أين ننسق العمل',
          locationSubtitle: 'القاهرة، مصر',
          responseHighlights: [
            { icon: <FiClock />, label: 'الرد خلال 24 ساعة عمل' },
            { icon: <FiLayers />, label: 'تحديد النطاق بوضوح قبل الإنتاج' },
            { icon: <FiTrendingUp />, label: 'تنفيذ بجاهزية إطلاق ونمو' }
          ],
          nextStepsTitle: 'ماذا يحدث بعد ذلك',
          nextSteps: [
            'نراجع الملخص ونحدد النطاق الأنسب.',
            'تصلك استجابة عملية مع الخطوات التالية.',
            'إذا كان هناك توافق نبدأ مرحلة discovery وخطة التنفيذ.'
          ],
          connectTitle: 'تابع قنواتنا',
          connectDescription:
            'استخدم قنواتنا لمتابعة الإطلاقات والأعمال المنفذة وما يحدث خلف الكواليس.',
          methodEmail: 'البريد',
          methodPhone: 'الهاتف',
          methodWhatsapp: 'واتساب',
          methodLocation: 'العنوان',
          namePlaceholder: 'اسمك الكامل',
          emailPlaceholder: 'you@company.com',
          phonePlaceholder: '+20...',
          companyPlaceholder: 'اسم الشركة أو البراند',
          noSocial: 'لا توجد روابط سوشيال مضافة حاليًا. يمكنك إضافتها من لوحة التحكم.'
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
    [
      copy.locationSubtitle,
      copy.methodEmail,
      copy.methodLocation,
      copy.methodPhone,
      copy.methodWhatsapp,
      siteInfo.address,
      siteInfo.email,
      siteInfo.phone,
      siteInfo.whatsapp
    ]
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
      toast.error(
        language === 'en' ? 'Please enter your email' : 'يرجى إدخال البريد الإلكتروني'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(
        language === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صحيح'
      );
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

      <div className="container contact-shell">
        <header className="contact-hero">
          <div className="section-copy contact-hero-copy">
            <span className="page-eyebrow">{copy.eyebrow}</span>
            <h1>{t('contact')}</h1>
            <h2>{copy.headline}</h2>
            <p>{copy.intro}</p>
          </div>

          <div className="contact-highlights">
            {copy.responseHighlights.map((item) => (
              <article key={item.label} className="contact-highlight-card">
                <div className="contact-highlight-icon">{item.icon}</div>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </header>

        <div className="contact-grid">
          <div className="contact-side">
            <div className="contact-methods-grid">
              {contactMethods.map((method, index) => (
                <motion.article
                  key={method.title}
                  className="contact-method-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
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

            <div className="contact-social-card">
              <div className="contact-card-head">
                <div className="contact-icon">
                  <FiMessageSquare />
                </div>
                <div>
                  <h3>{copy.connectTitle}</h3>
                  <p>{copy.connectDescription}</p>
                </div>
              </div>

              <div className="contact-social-grid">
                {socialLinks.length > 0 ? (
                  socialLinks.map((social) => (
                    <a
                      key={social.key}
                      href={socialMedia[social.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      style={{ '--social-color': social.color }}
                    >
                      <span className="contact-social-icon">{social.icon}</span>
                      <span>{social.label}</span>
                    </a>
                  ))
                ) : (
                  <p className="contact-social-empty">{copy.noSocial}</p>
                )}
              </div>
            </div>

            <div className="contact-next-card">
              <h3>{copy.nextStepsTitle}</h3>
              <ul>
                {copy.nextSteps.map((item) => (
                  <li key={item}>
                    <FiCheckCircle />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-head">
                <h2>{copy.formTitle}</h2>
                <p>{copy.formSubtitle}</p>
              </div>

              <div className="form-group">
                <label htmlFor="name">
                  <FiUser /> {t('name')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder={copy.namePlaceholder}
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
                  placeholder={copy.emailPlaceholder}
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
                    placeholder={copy.phonePlaceholder}
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
                    placeholder={copy.companyPlaceholder}
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

        <section className="contact-location-card">
          <div className="contact-location-icon">
            <FiMapPin />
          </div>
          <div>
            <h2>{copy.locationTitle}</h2>
            <p>{siteInfo.address || copy.locationSubtitle}</p>
            <span>{siteInfo.siteName || '4 Pixels'}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
