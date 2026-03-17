import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiPhone, FiZap } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getCached } from '../services/api';
import { PRIMARY_CATEGORIES, getCategoryLabel } from '../utils/categoryLabels';
import './Footer.css';

const Footer = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [openSections, setOpenSections] = useState({
    solutions: false,
    company: false,
    contact: true
  });

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchContent = async () => {
      try {
        const data = await getCached('/content', { ttl: 60000, signal: controller.signal });
        if (mounted) {
          setContent(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch footer content:', err.userMessage || err.message);
        }
      }
    };

    fetchContent();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const copy =
    language === 'en'
      ? {
          about: 'About',
          projects: 'Projects',
          contact: 'Contact',
          admin: 'Admin Login',
          email: 'Email',
          phone: 'Phone',
          whatsapp: 'WhatsApp',
          location: 'Location',
          cairo: 'Cairo, Egypt',
          defaultDescription:
            'Company websites, Shopify builds, and operational systems designed to make the brand look sharper and run cleaner.',
          noSocial: 'Add your social links from the dashboard when ready.',
          solutions: 'Solutions',
          company: 'Company',
          allRights: 'All rights reserved.',
          calloutTitle: 'Need a sharper company profile or a cleaner digital system?',
          calloutText:
            'Send the scope and we will turn it into a practical roadmap covering messaging, interface, systems, and delivery priorities.',
          calloutButton: 'Start A Brief',
          availabilityTitle: 'Working Model',
          availability: [
            'Reply within 24 business hours',
            'Remote delivery with Cairo-based coordination',
            'Shopify, automation, and systems under one team'
          ],
          fallbackTagline: 'Digital Product & Systems Studio'
        }
      : {
          about: 'من نحن',
          projects: 'المشاريع',
          contact: 'التواصل',
          admin: 'دخول الأدمن',
          email: 'البريد',
          phone: 'الهاتف',
          whatsapp: 'واتساب',
          location: 'العنوان',
          cairo: 'القاهرة، مصر',
          defaultDescription:
            'مواقع شركات، متاجر Shopify، وأنظمة تشغيل رقمية تخلي شكل البراند أقوى والشغل الداخلي أنضف.',
          noSocial: 'أضف روابط السوشيال من لوحة التحكم وقت ما تكون جاهزة.',
          solutions: 'الحلول',
          company: 'الشركة',
          allRights: 'جميع الحقوق محفوظة.',
          calloutTitle: 'محتاج بروفايل شركة أقوى أو سيستم رقمي أنضف؟',
          calloutText:
            'ابعت نطاق الشغل وسنحوّله لخارطة تنفيذ واضحة تشمل الرسالة والواجهة والأنظمة وأولوية التسليم.',
          calloutButton: 'ابدأ الملخص',
          availabilityTitle: 'أسلوب العمل',
          availability: [
            'الرد خلال 24 ساعة عمل',
            'تنفيذ عن بعد مع تنسيق من القاهرة',
            'Shopify والأتمتة والأنظمة تحت فريق واحد'
          ],
          fallbackTagline: 'استوديو المنتجات والأنظمة الرقمية'
        };

  const toggleSection = (section) => {
    if (window.innerWidth <= 768) {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const solutionLinks = useMemo(
    () =>
      PRIMARY_CATEGORIES.map((category) => ({
        label: getCategoryLabel(category, language),
        to: '/services'
      })),
    [language]
  );

  const companyLinks = [
    { label: copy.about, to: '/about' },
    { label: copy.projects, to: '/projects' },
    { label: copy.contact, to: '/contact' },
    { label: copy.admin, to: '/login' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, key: 'facebook', name: 'Facebook' },
    { icon: <FaInstagram />, key: 'instagram', name: 'Instagram' },
    { icon: <FaXTwitter />, key: 'twitter', name: 'X' },
    { icon: <FaLinkedin />, key: 'linkedin', name: 'LinkedIn' },
    { icon: <FaGithub />, key: 'github', name: 'GitHub' },
    { icon: <FaYoutube />, key: 'youtube', name: 'YouTube' },
    { icon: <FaTiktok />, key: 'tiktok', name: 'TikTok' },
    { icon: <FaBehance />, key: 'behance', name: 'Behance' },
    { icon: <FaDribbble />, key: 'dribbble', name: 'Dribbble' }
  ].filter((item) => content?.socialMedia?.[item.key]);

  const siteInfo = content?.siteInfo || {};
  const brandTagline = language === 'en' && siteInfo.tagline ? siteInfo.tagline : copy.fallbackTagline;
  const brandDescription =
    language === 'en' && siteInfo.description ? siteInfo.description : copy.defaultDescription;
  const contactItems = [
    {
      icon: <FiMail />,
      label: copy.email,
      value: siteInfo.email || 'info@4pixels.com',
      href: siteInfo.email ? `mailto:${siteInfo.email}` : 'mailto:info@4pixels.com'
    },
    {
      icon: <FiPhone />,
      label: copy.phone,
      value: siteInfo.phone || '+20 106 618 4859',
      href: siteInfo.phone ? `tel:${siteInfo.phone.replace(/\s+/g, '')}` : 'tel:+201066184859'
    },
    {
      icon: <FaWhatsapp />,
      label: copy.whatsapp,
      value: siteInfo.whatsapp || '+201066184859',
      href: siteInfo.whatsapp
        ? `https://wa.me/${siteInfo.whatsapp.replace(/[^\d]/g, '')}`
        : 'https://wa.me/201066184859'
    },
    {
      icon: <FiMapPin />,
      label: copy.location,
      value: siteInfo.address || copy.cairo,
      href: null
    }
  ];

  const availabilityItems = [
    { icon: <FiClock />, label: copy.availability[0] },
    { icon: <FiMapPin />, label: copy.availability[1] },
    { icon: <FiZap />, label: copy.availability[2] }
  ];

  return (
    <footer className="footer">
      <div className="container footer-shell">
        <motion.section
          className="footer-callout"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="footer-kicker">4 Pixels</span>
            <h2>{copy.calloutTitle}</h2>
            <p>{copy.calloutText}</p>
          </div>

          <Link to="/contact" className="footer-callout-btn">
            {copy.calloutButton}
            <FiArrowUpRight />
          </Link>
        </motion.section>

        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <section className="footer-brand">
            <h3>{siteInfo.siteName || '4 Pixels'}</h3>
            <p className="footer-tagline">{brandTagline}</p>
            <p className="footer-description">{brandDescription}</p>

            <div className="footer-availability-inline">
              {availabilityItems.map((item) => (
                <span key={item.label}>
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

            <div className="footer-socials">
              {socialLinks.length > 0 ? (
                socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={content.socialMedia[item.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))
              ) : (
                <span className="footer-social-note">{copy.noSocial}</span>
              )}
            </div>
          </section>

          <section className={`footer-column ${openSections.solutions ? 'open' : ''}`}>
            <button
              type="button"
              className="footer-section-toggle"
              onClick={() => toggleSection('solutions')}
              aria-expanded={openSections.solutions}
            >
              <span>{copy.solutions}</span>
            </button>
            <ul>
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`footer-column ${openSections.company ? 'open' : ''}`}>
            <button
              type="button"
              className="footer-section-toggle"
              onClick={() => toggleSection('company')}
              aria-expanded={openSections.company}
            >
              <span>{copy.company}</span>
            </button>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`footer-column footer-contact-column ${openSections.contact ? 'open' : ''}`}
          >
            <button
              type="button"
              className="footer-section-toggle"
              onClick={() => toggleSection('contact')}
              aria-expanded={openSections.contact}
            >
              <span>{copy.contact}</span>
            </button>
            <ul className="footer-contact-list">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <span className="footer-contact-icon">{item.icon}</span>
                  <div>
                    <small>{item.label}</small>
                    {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                  </div>
                </li>
              ))}
            </ul>

            <div className="footer-availability-block">
              <h5>{copy.availabilityTitle}</h5>
              <ul>
                {availabilityItems.map((item) => (
                  <li key={item.label}>
                    <span>{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </motion.div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} {siteInfo.siteName || '4 Pixels'}
          </span>
          <span>{copy.allRights}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
