import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './NotFound.css';

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <section className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="not-found-code">404</span>
          <h1>{language === 'en' ? 'Page not found' : 'الصفحة غير موجودة'}</h1>
          <p>
            {language === 'en'
              ? 'The page you requested does not exist or may have been moved.'
              : 'الصفحة التي طلبتها غير موجودة أو تم نقلها.'}
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            {language === 'en' ? 'Back to home' : 'العودة للرئيسية'}
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
