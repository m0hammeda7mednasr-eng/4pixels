import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    about: 'About Us',
    contact: 'Connections',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Admin Dashboard',
    hero: {
      title: 'Transform Your Digital Presence',
      subtitle: 'We create stunning digital experiences that drive results',
      cta1: 'Get Started',
      cta2: 'View Our Work'
    },
    trustedBy: 'Trusted By',
    viewAll: 'View All',
    learnMore: 'Learn More',
    requestService: 'Request Service',
    contactUs: 'Contact Us',
    sendMessage: 'Send Message',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    message: 'Message',
    selectService: 'Select Service'
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    projects: 'المشاريع',
    about: 'من نحن',
    contact: 'التواصل',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    hero: {
      title: 'حوّل حضورك الرقمي',
      subtitle: 'نصنع تجارب رقمية مذهلة تحقق النتائج',
      cta1: 'ابدأ الآن',
      cta2: 'شاهد أعمالنا'
    },
    trustedBy: 'يثقون بنا',
    viewAll: 'عرض الكل',
    learnMore: 'اعرف المزيد',
    requestService: 'اطلب الخدمة',
    contactUs: 'تواصل معنا',
    sendMessage: 'إرسال الرسالة',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    company: 'الشركة',
    message: 'الرسالة',
    selectService: 'اختر الخدمة'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
