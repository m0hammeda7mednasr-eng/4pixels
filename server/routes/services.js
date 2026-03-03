const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();
const asArray = (value) => (Array.isArray(value) ? value : []);

const normalizeBilingualField = (value) => ({
  en: typeof value?.en === 'string' ? value.en.trim() : '',
  ar: typeof value?.ar === 'string' ? value.ar.trim() : ''
});

const normalizeFeatures = (value) => ({
  en: asArray(value?.en).filter((item) => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim()),
  ar: asArray(value?.ar).filter((item) => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim())
});

const normalizePrice = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = asArray(readJSON('services.json'));
    const activeServices = services.filter(s => s.active !== false);
    res.json(activeServices);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const services = asArray(readJSON('services.json'));
    const service = services.find((s) => String(s.id) === String(req.params.id));
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create service (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const title = normalizeBilingualField(req.body.title);
    const description = normalizeBilingualField(req.body.description);
    const price = normalizePrice(req.body.price);
    const deliveryTime = typeof req.body.deliveryTime === 'string' ? req.body.deliveryTime.trim() : '';
    
    // Validation
    if (!title.en || !title.ar) {
      return res.status(400).json({ message: 'Title in both languages is required' });
    }
    if (!description.en || !description.ar) {
      return res.status(400).json({ message: 'Description in both languages is required' });
    }
    if (price === null || price < 0) {
      return res.status(400).json({ message: 'Valid price is required' });
    }
    if (!deliveryTime) {
      return res.status(400).json({ message: 'Delivery time is required' });
    }
    
    const services = asArray(readJSON('services.json'));
    const newService = {
      id: generateId(),
      ...req.body,
      title,
      description,
      price,
      deliveryTime,
      features: normalizeFeatures(req.body.features),
      active: true,
      createdAt: new Date().toISOString()
    };

    delete newService.images;

    services.push(newService);

    if (!writeJSON('services.json', services)) {
      return res.status(500).json({ message: 'Failed to persist service data' });
    }

    res.status(201).json(newService);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
});

// Update service (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const services = asArray(readJSON('services.json'));
    const index = services.findIndex((s) => String(s.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updates = { ...req.body };

    if ('title' in updates) {
      const title = normalizeBilingualField(updates.title);
      if (!title.en || !title.ar) {
        return res.status(400).json({ message: 'Title in both languages is required' });
      }
      updates.title = title;
    }

    if ('description' in updates) {
      const description = normalizeBilingualField(updates.description);
      if (!description.en || !description.ar) {
        return res.status(400).json({ message: 'Description in both languages is required' });
      }
      updates.description = description;
    }

    if ('price' in updates) {
      const price = normalizePrice(updates.price);
      if (price === null || price < 0) {
        return res.status(400).json({ message: 'Valid price is required' });
      }
      updates.price = price;
    }

    if ('deliveryTime' in updates) {
      const deliveryTime = typeof updates.deliveryTime === 'string' ? updates.deliveryTime.trim() : '';
      if (!deliveryTime) {
        return res.status(400).json({ message: 'Delivery time is required' });
      }
      updates.deliveryTime = deliveryTime;
    }

    if ('features' in updates) {
      updates.features = normalizeFeatures(updates.features);
    }

    if ('active' in updates) {
      updates.active = Boolean(updates.active);
    }

    delete updates.images;

    services[index] = {
      ...services[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (!writeJSON('services.json', services)) {
      return res.status(500).json({ message: 'Failed to persist service data' });
    }

    res.json(services[index]);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Failed to update service', error: err.message });
  }
});

// Delete service (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const services = asArray(readJSON('services.json'));
    const filtered = services.filter((s) => String(s.id) !== String(req.params.id));
    if (filtered.length === services.length) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (!writeJSON('services.json', filtered)) {
      return res.status(500).json({ message: 'Failed to persist service data' });
    }

    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
