import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    about: 'About Us',
    contact: 'Contact',
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
    selectService: 'Select Service',
    skipToContent: 'Skip to content',
    toggleMenu: 'Toggle menu',
    switchToArabic: 'Switch to Arabic',
    switchToEnglish: 'Switch to English',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    digitalAgency: 'Digital Agency',
    loading: 'Loading...'
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
    selectService: 'اختر الخدمة',
    skipToContent: 'تخطي إلى المحتوى',
    toggleMenu: 'تبديل القائمة',
    switchToArabic: 'التحويل إلى العربية',
    switchToEnglish: 'التحويل إلى الإنجليزية',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    digitalAgency: 'وكالة رقمية',
    loading: 'جارٍ التحميل...'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const storedLanguage = localStorage.getItem('language');
      return storedLanguage === 'ar' || storedLanguage === 'en' ? storedLanguage : 'en';
    } catch (_err) {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-language', language);

    document.body.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('lang', language);
    document.body.setAttribute('data-language', language);

    try {
      localStorage.setItem('language', language);
    } catch (_err) {
      // Ignore storage failures in private mode or restricted environments.
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    let fallbackValue = translations.en;

    for (const k of keys) {
      value = value?.[k];
      fallbackValue = fallbackValue?.[k];
    }

    return value ?? fallbackValue ?? key;
  };

  const contextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
      t
    }),
    [language]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};
