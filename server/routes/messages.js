const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Submit message (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    const messages = readJSON('messages.json');
    const newMessage = {
      id: generateId(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    messages.push(newMessage);
    writeJSON('messages.json', messages);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error submitting message:', err);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
});

// Get all messages (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const messages = readJSON('messages.json');
    res.json(messages.reverse());
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

// Mark as read (Admin only)
router.patch('/:id/read', auth, adminAuth, async (req, res) => {
  try {
    const messages = readJSON('messages.json');
    const index = messages.findIndex(m => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Message not found' });
    }
    messages[index].read = true;
    messages[index].readAt = new Date().toISOString();
    writeJSON('messages.json', messages);
    res.json(messages[index]);
  } catch (err) {
    console.error('Error marking message as read:', err);
    res.status(500).json({ message: 'Failed to update message', error: err.message });
  }
});

// Delete message (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const messages = readJSON('messages.json');
    const filtered = messages.filter(m => m.id !== req.params.id);
    if (filtered.length === messages.length) {
      return res.status(404).json({ message: 'Message not found' });
    }
    writeJSON('messages.json', filtered);
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ message: 'Failed to delete message', error: err.message });
  }
});

module.exports = router;
