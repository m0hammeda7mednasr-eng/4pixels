const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth } = require('../middleware/auth');
const { signAuthToken, verifyAuthToken } = require('../utils/jwt');
const { createRateLimiter } = require('../middleware/rateLimit');

const router = express.Router();

const registerLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many registration attempts. Try again in a few minutes.'
});

const loginLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 25,
  message: 'Too many login attempts. Try again in a few minutes.'
});

const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

const getRequestUser = (req) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return null;
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return verifyAuthToken(token.trim());
  } catch (_err) {
    return null;
  }
};

const sendValidationError = (res, errors) => {
  return res.status(400).json({
    message: 'Validation failed',
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

// Register route:
// - Public only when no users exist (initial bootstrap).
// - Once users exist, only authenticated admins can register additional users.
router.post(
  '/register',
  registerLimiter,
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendValidationError(res, errors);
    }

    try {
      const users = readJSON('users.json');
      const requester = getRequestUser(req);

      if (users.length > 0 && requester?.role !== 'admin') {
        return res.status(403).json({
          message: 'Registration is restricted to administrators'
        });
      }

      const email = normalizeEmail(req.body.email);
      const password = String(req.body.password);

      const existingUser = users.find((user) => normalizeEmail(user.email) === email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const isFirstUser = users.length === 0;
      const requestedRole = req.body.role === 'admin' ? 'admin' : 'user';
      const role = isFirstUser ? 'admin' : requestedRole;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: generateId(),
        email,
        password: hashedPassword,
        role,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      if (!writeJSON('users.json', users)) {
        return res.status(500).json({ message: 'Failed to save user' });
      }

      const token = signAuthToken({ id: newUser.id, role: newUser.role });

      return res.status(201).json({
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (err) {
      console.error('Auth register error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login
router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isString().notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendValidationError(res, errors);
    }

    try {
      const email = normalizeEmail(req.body.email);
      const password = String(req.body.password);

      const users = readJSON('users.json');
      const user = users.find((item) => normalizeEmail(item.email) === email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signAuthToken({ id: user.id, role: user.role });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Auth login error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// Current user
router.get('/me', auth, async (req, res) => {
  try {
    const users = readJSON('users.json');
    const user = users.find((item) => item.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error('Auth /me error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
