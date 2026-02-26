import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/services', label: t('services') },
    { to: '/projects', label: t('projects') },
    { to: '/about', label: t('about') },
    { to: '/contact', label: language === 'en' ? 'Connections' : t('contact') }
  ];

  if (user && isAdmin()) {
    navLinks.push({ to: '/admin', label: t('dashboard') });
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      className={`header ${menuOpen ? 'menu-open' : ''}`}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="container header-content">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link to="/" className="logo">
          <div className="logo-text">4Pixels</div>
          <div className="logo-tagline">Digital Agency</div>
        </Link>

        <nav id="main-nav" className={`nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={isActive(link.to) ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleLanguage}
            className="icon-btn"
            title={language === 'en' ? 'English active - switch to Arabic' : 'Arabic active - switch to English'}
            aria-label="Toggle language"
          >
            <span className="lang-text">{language.toUpperCase()}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="icon-btn"
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          {user ? (
            <button onClick={logout} className="icon-btn" title={t('logout')} aria-label={t('logout')}>
              <FiLogOut />
            </button>
          ) : (
            <Link to="/login" className="icon-btn" title={t('login')} aria-label={t('login')}>
              <FiUser />
            </Link>
          )}
        </div>
      </div>

      <button
        type="button"
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
      />
    </motion.header>
  );
};

export default Header;
