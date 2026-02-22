import React, { useState } from 'react';
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

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-content">
        {/* Menu Button - Mobile Only */}
        <button 
          className="menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-container">
            <div>
              <div className="logo-text">4Pixels</div>
              <div className="logo-tagline">Digital Agency</div>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {t('home')}
          </Link>
          <Link 
            to="/services" 
            className={isActive('/services') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {t('services')}
          </Link>
          <Link 
            to="/projects" 
            className={isActive('/projects') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {t('projects')}
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {t('about')}
          </Link>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {t('contact')}
          </Link>
          {user && isAdmin() && (
            <Link 
              to="/admin" 
              className={isActive('/admin') ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {t('dashboard')}
            </Link>
          )}
        </nav>

        {/* Actions - Right (3 buttons same size) */}
        <div className="header-actions">
          <button 
            onClick={toggleLanguage} 
            className="icon-btn lang-btn"
            title={language === 'en' ? 'العربية' : 'English'}
          >
            <span className="lang-text">{language === 'en' ? 'ع' : 'EN'}</span>
          </button>
          <button 
            onClick={toggleTheme} 
            className="icon-btn theme-btn"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          {user ? (
            <button 
              onClick={() => { logout(); setMenuOpen(false); }} 
              className="icon-btn logout-btn"
              title={t('logout')}
            >
              <FiLogOut />
            </button>
          ) : (
            <Link 
              to="/login" 
              className="icon-btn login-btn"
              onClick={() => setMenuOpen(false)}
              title={t('login')}
            >
              <FiUser />
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
