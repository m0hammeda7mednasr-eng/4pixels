import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiCheck, FiX, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { SiShopify } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import './ShopifyConnect.css';

const ShopifyConnect = () => {
  const { language } = useLanguage();
  const [shopDomain, setShopDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectedStores, setConnectedStores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConnectedStores();
  }, []);

  const fetchConnectedStores = async () => {
    try {
      const response = await api.get('/shopify/stores');
      setConnectedStores(response.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
    }
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate and format shop domain
      let shop = shopDomain.trim().toLowerCase();
      
      // Remove https:// or http://
      shop = shop.replace(/^https?:\/\//, '');
      
      // Add .myshopify.com if not present
      if (!shop.includes('.myshopify.com')) {
        shop = `${shop}.myshopify.com`;
      }

      // Get install URL from backend
      const response = await api.get(`/shopify/auth?shop=${shop}`);
      
      // Redirect to Shopify OAuth
      window.location.href = response.data.installUrl;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to Shopify');
      setLoading(false);
    }
  };

  const handleDisconnect = async (shop) => {
    if (!window.confirm(`Are you sure you want to disconnect ${shop}?`)) {
      return;
    }

    try {
      await api.delete(`/shopify/stores/${shop}`);
      setConnectedStores(connectedStores.filter(s => s.shop !== shop));
    } catch (err) {
      alert('Failed to disconnect store');
    }
  };

  return (
    <div className="shopify-connect-page">
      <div className="container">
        <motion.div
          className="shopify-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="shopify-icon">
            <SiShopify />
          </div>
          <h1>
            {language === 'en' ? 'Connect Your Shopify Store' : 'ربط متجر Shopify'}
          </h1>
          <p>
            {language === 'en' 
              ? 'Integrate your Shopify store to manage products, orders, and customers seamlessly.'
              : 'قم بربط متجر Shopify الخاص بك لإدارة المنتجات والطلبات والعملاء بسهولة.'
            }
          </p>
        </motion.div>

        {/* Connect Form */}
        <motion.div
          className="connect-form-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>
            {language === 'en' ? 'Add New Store' : 'إضافة متجر جديد'}
          </h2>
          <form onSubmit={handleConnect}>
            <div className="form-group">
              <label>
                {language === 'en' ? 'Store Domain' : 'نطاق المتجر'}
              </label>
              <div className="input-with-suffix">
                <input
                  type="text"
                  value={shopDomain}
                  onChange={(e) => setShopDomain(e.target.value)}
                  placeholder={language === 'en' ? 'your-store' : 'اسم-متجرك'}
                  required
                  disabled={loading}
                />
                <span className="input-suffix">.myshopify.com</span>
              </div>
              <small>
                {language === 'en' 
                  ? 'Enter your Shopify store name (e.g., my-store)'
                  : 'أدخل اسم متجر Shopify الخاص بك (مثال: my-store)'
                }
              </small>
            </div>

            {error && (
              <div className="error-message">
                <FiX /> {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-shopify"
              disabled={loading}
            >
              {loading ? (
                language === 'en' ? 'Connecting...' : 'جاري الربط...'
              ) : (
                <>
                  <SiShopify />
                  {language === 'en' ? 'Connect to Shopify' : 'الربط مع Shopify'}
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Connected Stores */}
        {connectedStores.length > 0 && (
          <motion.div
            className="connected-stores"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>
              {language === 'en' ? 'Connected Stores' : 'المتاجر المتصلة'}
            </h2>
            <div className="stores-grid">
              {connectedStores.map((store, index) => (
                <motion.div
                  key={store.shop}
                  className="store-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="store-header">
                    <div className="store-icon">
                      <SiShopify />
                    </div>
                    <div className="store-status">
                      <FiCheck />
                      {language === 'en' ? 'Connected' : 'متصل'}
                    </div>
                  </div>
                  <div className="store-info">
                    <h3>{store.shopInfo.name}</h3>
                    <p className="store-domain">{store.shop}</p>
                    <div className="store-details">
                      <span>
                        <strong>{language === 'en' ? 'Email:' : 'البريد:'}</strong> {store.shopInfo.email}
                      </span>
                      <span>
                        <strong>{language === 'en' ? 'Currency:' : 'العملة:'}</strong> {store.shopInfo.currency}
                      </span>
                    </div>
                  </div>
                  <div className="store-actions">
                    <a 
                      href={`https://${store.shop}/admin`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                    >
                      <FiExternalLink />
                      {language === 'en' ? 'Open Admin' : 'فتح لوحة التحكم'}
                    </a>
                    <button
                      onClick={() => handleDisconnect(store.shop)}
                      className="btn btn-sm btn-danger"
                    >
                      <FiTrash2 />
                      {language === 'en' ? 'Disconnect' : 'قطع الاتصال'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          className="shopify-features"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>
            {language === 'en' ? 'What You Can Do' : 'ما يمكنك فعله'}
          </h2>
          <div className="features-grid">
            <div className="feature-item">
              <FiShoppingBag />
              <h3>{language === 'en' ? 'Manage Products' : 'إدارة المنتجات'}</h3>
              <p>
                {language === 'en' 
                  ? 'View, edit, and sync your product catalog'
                  : 'عرض وتعديل ومزامنة كتالوج المنتجات'
                }
              </p>
            </div>
            <div className="feature-item">
              <FiCheck />
              <h3>{language === 'en' ? 'Track Orders' : 'تتبع الطلبات'}</h3>
              <p>
                {language === 'en' 
                  ? 'Monitor and manage customer orders in real-time'
                  : 'مراقبة وإدارة طلبات العملاء في الوقت الفعلي'
                }
              </p>
            </div>
            <div className="feature-item">
              <FiExternalLink />
              <h3>{language === 'en' ? 'Automation' : 'الأتمتة'}</h3>
              <p>
                {language === 'en' 
                  ? 'Automate workflows and save time'
                  : 'أتمتة سير العمل وتوفير الوقت'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopifyConnect;
