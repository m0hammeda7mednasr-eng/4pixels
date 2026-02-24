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

// Get content by section (siteInfo, socialMedia, hero)
router.get('/:section', async (req, res) => {
  try {
    const content = readJSON('content.json');
    const section = content[req.params.section];
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content section (Admin only)
router.put('/:section', auth, adminAuth, async (req, res) => {
  try {
    const content = readJSON('content.json');
    content[req.params.section] = {
      ...content[req.params.section],
      ...req.body
    };
    writeJSON('content.json', content);
    res.json(content[req.params.section]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update entire content (Admin only)
router.put('/', auth, adminAuth, async (req, res) => {
  try {
    writeJSON('content.json', req.body);
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
