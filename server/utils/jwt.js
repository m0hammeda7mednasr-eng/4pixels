const jwt = require('jsonwebtoken');

const DEV_FALLBACK_SECRET = 'change-this-dev-secret-before-production';

const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }

  return DEV_FALLBACK_SECRET;
};

const signAuthToken = (payload, options = {}) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d', ...options });
};

const verifyAuthToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  getJwtSecret,
  signAuthToken,
  verifyAuthToken
};
