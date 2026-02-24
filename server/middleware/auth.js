const { verifyAuthToken } = require('../utils/jwt');

const getBearerToken = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token.trim();
};

const auth = (req, res, next) => {
  const token = getBearerToken(req);
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = verifyAuthToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { auth, adminAuth };
