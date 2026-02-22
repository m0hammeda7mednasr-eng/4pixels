const express = require('express');
const { readJSON, writeJSON } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = readJSON('content.json');
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content by key
router.get('/:key', async (req, res) => {
  try {
    const content = readJSON('content.json');
    const item = content.find(c => c.key === req.params.key);
    if (!item) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update or create content (Admin only)
router.put('/:key', auth, adminAuth, async (req, res) => {
  try {
    const content = readJSON('content.json');
    const index = content.findIndex(c => c.key === req.params.key);
    
    if (index === -1) {
      const newContent = {
        key: req.params.key,
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      content.push(newContent);
      writeJSON('content.json', content);
      res.json(newContent);
    } else {
      content[index] = {
        ...content[index],
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      writeJSON('content.json', content);
      res.json(content[index]);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
