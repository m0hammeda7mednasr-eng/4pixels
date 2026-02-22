const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register (Admin only - for initial setup)
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, role } = req.body;
    
    const users = readJSON('users.json');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If this is the first user, make them admin
    const isFirstUser = users.length === 0;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: generateId(),
      email,
      password: hashedPassword,
      role: isFirstUser ? 'admin' : (role || 'user'),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    writeJSON('users.json', users);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'fourpixels_secret_key_2024', { expiresIn: '7d' });
    res.json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    
    const users = readJSON('users.json');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'fourpixels_secret_key_2024', { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const users = readJSON('users.json');
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
