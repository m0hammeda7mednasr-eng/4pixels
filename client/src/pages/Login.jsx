import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast, ToastContainer } from 'react-toastify';
import api from '../services/api';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const { t, language } = useLanguage();
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect to admin if already authenticated as admin
  React.useEffect(() => {
    if (user && isAdmin()) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await api.post('/auth/register', formData);
        await login(formData.email, formData.password);
        toast.success(language === 'en' ? 'Registration successful' : 'تم إنشاء الحساب بنجاح');
      } else {
        await login(formData.email, formData.password);
        toast.success(language === 'en' ? 'Login successful' : 'تم تسجيل الدخول بنجاح');
      }

      navigate('/admin', { replace: true });
    } catch (err) {
      toast.error(
        err.userMessage ||
          err.message ||
          (language === 'en' ? 'Authentication failed' : 'فشل التحقق من الحساب')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-center" />
      <div className="login-container">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-header">
            <h2>{isRegister ? (language === 'en' ? 'Register' : 'تسجيل حساب') : t('login')}</h2>
            <p>
              {isRegister
                ? language === 'en'
                  ? 'Create an admin account (initial setup or admin-approved).'
                  : 'أنشئ حساب أدمن (للإعداد الأولي أو بموافقة أدمن).'
                : language === 'en'
                ? 'Welcome back to Four Pixels'
                : 'مرحبًا بعودتك إلى فور بيكسلز'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FiMail /> {t('email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FiLock /> {language === 'en' ? 'Password' : 'كلمة المرور'}
              </label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading
                ? isRegister
                  ? language === 'en'
                    ? 'Creating account...'
                    : 'جارٍ إنشاء الحساب...'
                  : language === 'en'
                  ? 'Logging in...'
                  : 'جارٍ تسجيل الدخول...'
                : isRegister
                ? language === 'en'
                  ? 'Register'
                  : 'تسجيل'
                : t('login')}
            </button>
          </form>

          <div className="login-footer">
            <button 
              type="button" 
              className="toggle-mode-btn"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? language === 'en'
                  ? 'Already have an account? Login'
                  : 'عندك حساب بالفعل؟ سجّل دخول'
                : language === 'en'
                ? 'Need an account? Register'
                : 'تحتاج حساب؟ سجّل الآن'}
            </button>
            <Link to="/">{language === 'en' ? '← Back to Home' : 'العودة للرئيسية ←'}</Link>
          </div>
        </motion.div>

        <motion.div
          className="login-illustration"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="illustration-content">
            <h3>Four Pixels</h3>
            <p>
              {language === 'en'
                ? 'Transform Your Digital Presence'
                : 'حوّل حضورك الرقمي إلى نتائج عملية'}
            </p>
            <div className="illustration-graphic">
              <div className="graphic-circle circle-1"></div>
              <div className="graphic-circle circle-2"></div>
              <div className="graphic-circle circle-3"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
