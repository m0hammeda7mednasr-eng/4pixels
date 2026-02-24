import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        // Register
        const response = await fetch('http://localhost:5001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Registration successful!');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        // Login
        await login(formData.email, formData.password);
        toast.success('Login successful!');
        setTimeout(() => navigate('/admin'), 1000);
      }
    } catch (err) {
      toast.error(err.message || 'Authentication failed');
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
            <h2>{isRegister ? 'Register' : t('login')}</h2>
            <p>{isRegister ? 'Create your admin account' : 'Welcome back to Four Pixels'}</p>
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
                <FiLock /> Password
              </label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? (isRegister ? 'Creating account...' : 'Logging in...') : (isRegister ? 'Register' : t('login'))}
            </button>
          </form>

          <div className="login-footer">
            <button 
              type="button" 
              className="toggle-mode-btn"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
            <Link to="/">&larr; Back to Home</Link>
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
            <p>Transform Your Digital Presence</p>
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
