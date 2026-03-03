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
  const [openSections, setOpenSections] = useState({
    solutions: false,
    company: false,
    contact: false
  });

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

  const toggleSection = (section) => {
    if (window.innerWidth <= 768) {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const copy = language === 'en'
    ? {
      about: 'About Us',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Admin Login',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      cairo: 'Cairo, Egypt',
      digitalAgency: 'Digital Agency',
      defaultDescription: 'Shopify stores, automation, and systems built for measurable growth.',
      noSocial: 'Add social links from admin dashboard.',
      solutions: 'Solutions',
      company: 'Company',
      allRights: 'All rights reserved.'
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
      digitalAgency: 'الوكالة الرقمية',
      defaultDescription: 'متاجر شوبيفاي وأتمتة وأنظمة رقمية بنتائج قابلة للقياس.',
      noSocial: 'أضف روابط السوشيال من لوحة الأدمن.',
      solutions: 'الحلول',
      company: 'الشركة',
      allRights: 'جميع الحقوق محفوظة.'
    };

  const solutionLinks = useMemo(() => {
    return PRIMARY_CATEGORIES.map((category) => ({
      label: getCategoryLabel(category, language),
      to: '/services'
    }));
  }, [language]);

  const companyLinks = [
    { label: copy.about, to: '/about' },
    { label: copy.projects, to: '/projects' },
    { label: copy.contact, to: '/contact' },
    { label: copy.admin, to: '/login' }
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
      label: copy.email,
      value: siteInfo.email || 'info@4pixels.com',
      href: siteInfo.email ? `mailto:${siteInfo.email}` : null
    },
    {
      icon: <FiPhone />,
      label: copy.phone,
      value: siteInfo.phone || '+20 106 618 4859',
      href: siteInfo.phone ? `tel:${siteInfo.phone.replace(/\s+/g, '')}` : null
    },
    {
      icon: <FaWhatsapp />,
      label: copy.whatsapp,
      value: siteInfo.whatsapp || '+201066184859',
      href: siteInfo.whatsapp ? `https://wa.me/${siteInfo.whatsapp.replace(/[^\d]/g, '')}` : null
    },
    {
      icon: <FiMapPin />,
      label: copy.location,
      value: siteInfo.address || copy.cairo,
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
            <h3>{siteInfo.siteName || '4 Pixels'}</h3>
            <p className="footer-tagline">{siteInfo.tagline || copy.digitalAgency}</p>
            <p className="footer-description">{siteInfo.description || copy.defaultDescription}</p>

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
            <h4 onClick={() => toggleSection('solutions')}>{copy.solutions}</h4>
            <ul>
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`footer-column ${openSections.company ? 'open' : ''}`}>
            <h4 onClick={() => toggleSection('company')}>{copy.company}</h4>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`footer-column ${openSections.contact ? 'open' : ''}`}>
            <h4 onClick={() => toggleSection('contact')}>{copy.contact}</h4>
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
