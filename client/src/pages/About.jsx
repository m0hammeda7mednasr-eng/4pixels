import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      story: '4Pixels is a leading digital agency specializing in Shopify development, automation solutions, CRM integration, and AI-powered tools. Founded with a passion for innovation and excellence, we help businesses transform their digital presence and achieve measurable results.',
      mission: 'Our mission is to empower businesses with cutting-edge digital solutions that deliver measurable results and exceed expectations through innovative technology and exceptional service.',
      vision: 'To be the most trusted digital partner for businesses worldwide, known for our creativity, innovation, and commitment to excellence in Shopify, automation, CRM, and AI solutions.',
    },
    ar: {
      story: '4Pixels هي وكالة رقمية رائدة متخصصة في تطوير Shopify وحلول الأتمتة وتكامل CRM والأدوات المدعومة بالذكاء الاصطناعي. تأسست بشغف للابتكار والتميز، نساعد الشركات على تحويل حضورها الرقمي وتحقيق نتائج قابلة للقياس.',
      mission: 'مهمتنا هي تمكين الشركات بحلول رقمية متطورة تحقق نتائج قابلة للقياس وتتجاوز التوقعات من خلال التكنولوجيا المبتكرة والخدمة الاستثنائية.',
      vision: 'أن نكون الشريك الرقمي الأكثر ثقة للشركات في جميع أنحاء العالم، معروفين بإبداعنا وابتكارنا والتزامنا بالتميز في حلول Shopify والأتمتة وCRM والذكاء الاصطناعي.',
    }
  };

  const stats = [
    { icon: <FiUsers />, number: '50+', label: { en: 'Happy Clients', ar: 'عميل سعيد' } },
    { icon: <FiAward />, number: '150+', label: { en: 'Projects Completed', ar: 'مشروع مكتمل' } },
    { icon: <FiTarget />, number: '98%', label: { en: 'Success Rate', ar: 'معدل النجاح' } },
    { icon: <FiTrendingUp />, number: '5+', label: { en: 'Years Experience', ar: 'سنوات خبرة' } },
  ];

  const values = [
    {
      icon: <FiAward />,
      title: { en: 'Excellence', ar: 'التميز' },
      description: { en: 'We strive for excellence in every project we undertake', ar: 'نسعى للتميز في كل مشروع نقوم به' }
    },
    {
      icon: <FiUsers />,
      title: { en: 'Client-Focused', ar: 'التركيز على العميل' },
      description: { en: 'Your success is our priority', ar: 'نجاحك هو أولويتنا' }
    },
    {
      icon: <FiTarget />,
      title: { en: 'Innovation', ar: 'الابتكار' },
      description: { en: 'We embrace new technologies and creative solutions', ar: 'نتبنى التقنيات الجديدة والحلول الإبداعية' }
    },
    {
      icon: <FiTrendingUp />,
      title: { en: 'Results-Driven', ar: 'موجه بالنتائج' },
      description: { en: 'We deliver measurable results that matter', ar: 'نقدم نتائج قابلة للقياس ومهمة' }
    },
  ];

  const data = content[language];

  return (
    <div className="about-page section">
      <div className="container">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('about')}
        </motion.h1>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="about-stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="stat-icon-large">{stat.icon}</div>
              <div className="stat-number-large">{stat.number}</div>
              <div className="stat-label-large">{stat.label[language]}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="about-section">
            <h2>{language === 'en' ? 'Our Story' : 'قصتنا'}</h2>
            <p>{data.story}</p>
          </div>

          <div className="about-section">
            <h2>{language === 'en' ? 'Mission' : 'المهمة'}</h2>
            <p>{data.mission}</p>
          </div>

          <div className="about-section">
            <h2>{language === 'en' ? 'Vision' : 'الرؤية'}</h2>
            <p>{data.vision}</p>
          </div>
        </motion.div>

        <motion.div
          className="values-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="values-title">{language === 'en' ? 'Our Values' : 'قيمنا'}</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title[language]}</h3>
                <p>{value.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
