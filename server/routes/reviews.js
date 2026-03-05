const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

const asArray = (value) => (Array.isArray(value) ? value : []);

const normalizeBilingualField = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return { en: trimmed, ar: trimmed };
  }

  return {
    en: typeof value?.en === 'string' ? value.en.trim() : '',
    ar: typeof value?.ar === 'string' ? value.ar.trim() : ''
  };
};

const normalizeImage = (value) =>
  typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : 'https://i.pravatar.cc/300';

const normalizeRating = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  const rounded = Math.round(parsed);
  return rounded >= 1 && rounded <= 5 ? rounded : null;
};

const validateReview = ({ name, text, rating }) => {
  if (!name.en || !name.ar) {
    return 'Name in both languages is required';
  }

  if (!text.en || !text.ar) {
    return 'Review text in both languages is required';
  }

  if (rating === null) {
    return 'Rating must be between 1 and 5';
  }

  return null;
};

// Get all reviews (Public - only active)
router.get('/', async (_req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    const activeReviews = reviews.filter((review) => review.active !== false);
    res.json(activeReviews);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// Get all reviews (Admin - including inactive)
router.get('/admin/all', auth, adminAuth, async (_req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    const review = reviews.find((entry) => String(entry.id) === String(req.params.id));
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.json(review);
  } catch (_err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create review (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const name = normalizeBilingualField(req.body.name);
    const text = normalizeBilingualField(req.body.text);
    const image = normalizeImage(req.body.image);
    const rating = normalizeRating(req.body.rating);
    const verified = req.body.verified !== false;
    const active = req.body.active !== false;

    const validationError = validateReview({ name, text, rating });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const reviews = asArray(readJSON('reviews.json'));
    const newReview = {
      id: generateId(),
      name,
      text,
      image,
      rating,
      verified,
      active,
      createdAt: new Date().toISOString()
    };

    reviews.push(newReview);

    if (!writeJSON('reviews.json', reviews)) {
      return res.status(500).json({ message: 'Failed to persist review data' });
    }

    return res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err.message);
    return res.status(500).json({ message: 'Failed to create review' });
  }
});

// Update review (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    const index = reviews.findIndex((entry) => String(entry.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const currentReview = reviews[index];
    const hasOwn = (field) => Object.prototype.hasOwnProperty.call(req.body, field);

    const name = hasOwn('name') ? normalizeBilingualField(req.body.name) : normalizeBilingualField(currentReview.name);
    const text = hasOwn('text') ? normalizeBilingualField(req.body.text) : normalizeBilingualField(currentReview.text);
    const rating = hasOwn('rating') ? normalizeRating(req.body.rating) : normalizeRating(currentReview.rating);
    const image = hasOwn('image') ? normalizeImage(req.body.image) : normalizeImage(currentReview.image);
    const verified = hasOwn('verified') ? Boolean(req.body.verified) : Boolean(currentReview.verified);
    const active = hasOwn('active') ? Boolean(req.body.active) : Boolean(currentReview.active);

    const validationError = validateReview({ name, text, rating });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    reviews[index] = {
      ...currentReview,
      name,
      text,
      image,
      rating,
      verified,
      active,
      updatedAt: new Date().toISOString()
    };

    if (!writeJSON('reviews.json', reviews)) {
      return res.status(500).json({ message: 'Failed to persist review data' });
    }

    return res.json(reviews[index]);
  } catch (err) {
    console.error('Error updating review:', err.message);
    return res.status(500).json({ message: 'Failed to update review' });
  }
});

// Toggle review active status (Admin only)
router.patch('/:id/toggle', auth, adminAuth, async (req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    const index = reviews.findIndex((entry) => String(entry.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    reviews[index].active = !reviews[index].active;
    reviews[index].updatedAt = new Date().toISOString();

    if (!writeJSON('reviews.json', reviews)) {
      return res.status(500).json({ message: 'Failed to persist review data' });
    }

    return res.json(reviews[index]);
  } catch (err) {
    console.error('Error toggling review:', err.message);
    return res.status(500).json({ message: 'Failed to toggle review' });
  }
});

// Delete review (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const reviews = asArray(readJSON('reviews.json'));
    const filtered = reviews.filter((entry) => String(entry.id) !== String(req.params.id));
    if (filtered.length === reviews.length) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!writeJSON('reviews.json', filtered)) {
      return res.status(500).json({ message: 'Failed to persist review data' });
    }

    return res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err.message);
    return res.status(500).json({ message: 'Failed to delete review' });
  }
});

module.exports = router;
