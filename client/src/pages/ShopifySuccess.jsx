import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { SiShopify } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import './ShopifySuccess.css';

const ShopifySuccess = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shop = searchParams.get('shop');

  useEffect(() => {
    // Redirect to Shopify connect page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/admin/shopify');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="shopify-success-page">
      <div className="container">
        <motion.div
          className="success-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FiCheckCircle />
          </motion.div>
          
          <motion.div
            className="shopify-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SiShopify />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {language === 'en' ? 'Successfully Connected!' : 'تم الربط بنجاح!'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {language === 'en' 
              ? `Your Shopify store "${shop}" has been connected successfully.`
              : `تم ربط متجر Shopify "${shop}" بنجاح.`
            }
          </motion.p>

          <motion.p
            className="redirect-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {language === 'en' 
              ? 'Redirecting you back...'
              : 'جاري إعادة التوجيه...'
            }
          </motion.p>

          <motion.button
            className="btn btn-primary"
            onClick={() => navigate('/admin/shopify')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {language === 'en' ? 'Go to Dashboard' : 'الذهاب إلى لوحة التحكم'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopifySuccess;
