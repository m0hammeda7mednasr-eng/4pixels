import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaBehance,
  FaDribbble,
  FaWhatsapp
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { PRIMARY_CATEGORIES, getCategoryLabel } from '../utils/categoryLabels';
import './Footer.css';

const Footer = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content');
        setContent(response.data);
      } catch (err) {
        console.error('Failed to fetch content:', err.userMessage || err.message);
      }
    };

    fetchContent();
  }, []);

  const solutionLinks = useMemo(() => {
    return PRIMARY_CATEGORIES.map((category) => ({
      label: getCategoryLabel(category, language),
      to: '/services'
    }));
  }, [language]);

  const companyLinks = [
    { label: { en: 'About Us', ar: 'من نحن' }, to: '/about' },
    { label: { en: 'Projects', ar: 'المشاريع' }, to: '/projects' },
    { label: { en: 'Contact', ar: 'التواصل' }, to: '/contact' },
    { label: { en: 'Admin Login', ar: 'دخول الأدمن' }, to: '/login' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, key: 'facebook', name: 'Facebook' },
    { icon: <FaInstagram />, key: 'instagram', name: 'Instagram' },
    { icon: <FaXTwitter />, key: 'twitter', name: 'Twitter' },
    { icon: <FaLinkedin />, key: 'linkedin', name: 'LinkedIn' },
    { icon: <FaGithub />, key: 'github', name: 'GitHub' },
    { icon: <FaYoutube />, key: 'youtube', name: 'YouTube' },
    { icon: <FaTiktok />, key: 'tiktok', name: 'TikTok' },
    { icon: <FaBehance />, key: 'behance', name: 'Behance' },
    { icon: <FaDribbble />, key: 'dribbble', name: 'Dribbble' }
  ].filter((item) => content?.socialMedia?.[item.key]);

  const siteInfo = content?.siteInfo || {};
  const contactItems = [
    {
      icon: <FiMail />,
      label: language === 'en' ? 'Email' : 'البريد',
      value: siteInfo.email || 'info@4pixels.com',
      href: siteInfo.email ? `mailto:${siteInfo.email}` : null
    },
    {
      icon: <FiPhone />,
      label: language === 'en' ? 'Phone' : 'الهاتف',
      value: siteInfo.phone || '+20 106 618 4859',
      href: siteInfo.phone ? `tel:${siteInfo.phone.replace(/\s+/g, '')}` : null
    },
    {
      icon: <FaWhatsapp />,
      label: language === 'en' ? 'WhatsApp' : 'واتساب',
      value: siteInfo.whatsapp || '+201066184859',
      href: siteInfo.whatsapp ? `https://wa.me/${siteInfo.whatsapp.replace(/[^\d]/g, '')}` : null
    },
    {
      icon: <FiMapPin />,
      label: language === 'en' ? 'Location' : 'العنوان',
      value: siteInfo.address || (language === 'en' ? 'Cairo, Egypt' : 'القاهرة، مصر'),
      href: null
    }
  ];

  return (
    <footer className="footer">
      <div className="container footer-shell">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <section className="footer-brand">
            <h3>{siteInfo.siteName || '4Pixels'}</h3>
            <p className="footer-tagline">
              {siteInfo.tagline || (language === 'en' ? 'Digital Delivery Studio' : 'استوديو تنفيذ رقمي')}
            </p>
            <p className="footer-description">
              {siteInfo.description ||
                (language === 'en'
                  ? 'Shopify stores, automation, and systems built for measurable growth.'
                  : 'متاجر شوبيفاي وأتمتة وأنظمة رقمية بنتائج قابلة للقياس.')}
            </p>

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
                <span className="footer-social-note">
                  {language === 'en'
                    ? 'Add social links from admin dashboard.'
                    : 'أضف روابط السوشيال من لوحة الأدمن.'}
                </span>
              )}
            </div>
          </section>

          <section className="footer-column">
            <h4>{language === 'en' ? 'Solutions' : 'الحلول'}</h4>
            <ul>
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-column">
            <h4>{language === 'en' ? 'Company' : 'الشركة'}</h4>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label[language]}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-column">
            <h4>{language === 'en' ? 'Contact' : 'التواصل'}</h4>
            <ul className="footer-contact-list">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <span className="contact-icon">{item.icon}</span>
                  <div>
                    <small>{item.label}</small>
                    {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>

        <div className="footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} {siteInfo.siteName || '4Pixels'}
          </span>
          <span>{language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
