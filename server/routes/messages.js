const express = require('express');
const { body, validationResult } = require('express-validator');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');
const { createRateLimiter } = require('../middleware/rateLimit');

const router = express.Router();

const publicMessageLimiter = createRateLimiter({
  windowMs: 30 * 60 * 1000,
  max: 8,
  message: 'Too many messages were submitted. Please try again later.'
});

const sanitizeField = (value, maxLength = 200) => {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, maxLength);
};

const submissionValidation = [
  body('name')
    .isString()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('message')
    .isString()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('phone')
    .optional({ values: 'falsy' })
    .isString()
    .isLength({ max: 30 })
    .withMessage('Phone is too long'),
  body('company')
    .optional({ values: 'falsy' })
    .isString()
    .isLength({ max: 80 })
    .withMessage('Company is too long'),
  body('service')
    .optional({ values: 'falsy' })
    .isString()
    .isLength({ max: 120 })
    .withMessage('Service is too long')
];

// Submit message (Public)
router.post('/', publicMessageLimiter, submissionValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  try {
    const messages = readJSON('messages.json');
    const newMessage = {
      id: generateId(),
      name: sanitizeField(req.body.name, 80),
      email: sanitizeField(req.body.email, 120).toLowerCase(),
      phone: sanitizeField(req.body.phone, 30),
      company: sanitizeField(req.body.company, 80),
      service: sanitizeField(req.body.service, 120),
      message: sanitizeField(req.body.message, 2000),
      read: false,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);

    if (!writeJSON('messages.json', messages)) {
      return res.status(500).json({ message: 'Failed to save message' });
    }

    return res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error submitting message:', err.message);
    return res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get all messages (Admin only)
router.get('/', auth, adminAuth, async (_req, res) => {
  try {
    const messages = readJSON('messages.json');
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return res.json(sortedMessages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    return res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Mark as read (Admin only)
router.patch('/:id/read', auth, adminAuth, async (req, res) => {
  try {
    const messages = readJSON('messages.json');
    const index = messages.findIndex((message) => message.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }

    messages[index].read = true;
    messages[index].readAt = new Date().toISOString();

    if (!writeJSON('messages.json', messages)) {
      return res.status(500).json({ message: 'Failed to update message' });
    }

    return res.json(messages[index]);
  } catch (err) {
    console.error('Error marking message as read:', err.message);
    return res.status(500).json({ message: 'Failed to update message' });
  }
});

// Delete message (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const messages = readJSON('messages.json');
    const filteredMessages = messages.filter((message) => message.id !== req.params.id);

    if (filteredMessages.length === messages.length) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (!writeJSON('messages.json', filteredMessages)) {
      return res.status(500).json({ message: 'Failed to delete message' });
    }

    return res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err.message);
    return res.status(500).json({ message: 'Failed to delete message' });
  }
});

module.exports = router;
