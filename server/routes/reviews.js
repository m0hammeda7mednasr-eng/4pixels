const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all reviews (Public - only active)
router.get('/', async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    const activeReviews = reviews.filter(r => r.active !== false);
    res.json(activeReviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
});

// Get all reviews (Admin - including inactive)
router.get('/admin/all', auth, adminAuth, async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    const review = reviews.find(r => r.id === req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, text, image, rating } = req.body;
    
    // Validation
    if (!name || !name.en || !name.ar) {
      return res.status(400).json({ message: 'Name in both languages is required' });
    }
    if (!text || !text.en || !text.ar) {
      return res.status(400).json({ message: 'Review text in both languages is required' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const reviews = readJSON('reviews.json');
    const newReview = {
      id: generateId(),
      name,
      text,
      image: image || 'https://i.pravatar.cc/300',
      rating: parseInt(rating),
      verified: true,
      active: true,
      createdAt: new Date().toISOString()
    };
    reviews.push(newReview);
    writeJSON('reviews.json', reviews);
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Failed to create review', error: err.message });
  }
});

// Update review (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }
    reviews[index] = { 
      ...reviews[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    writeJSON('reviews.json', reviews);
    res.json(reviews[index]);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: 'Failed to update review', error: err.message });
  }
});

// Toggle review active status (Admin only)
router.patch('/:id/toggle', auth, adminAuth, async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    const index = reviews.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }
    reviews[index].active = !reviews[index].active;
    reviews[index].updatedAt = new Date().toISOString();
    writeJSON('reviews.json', reviews);
    res.json(reviews[index]);
  } catch (err) {
    console.error('Error toggling review:', err);
    res.status(500).json({ message: 'Failed to toggle review', error: err.message });
  }
});

// Delete review (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const reviews = readJSON('reviews.json');
    const filtered = reviews.filter(r => r.id !== req.params.id);
    if (filtered.length === reviews.length) {
      return res.status(404).json({ message: 'Review not found' });
    }
    writeJSON('reviews.json', filtered);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
});

module.exports = router;
