const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = readJSON('services.json');
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
    const services = readJSON('services.json');
    const service = services.find(s => s.id === req.params.id);
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
    const { title, description, price, deliveryTime } = req.body;
    
    // Validation
    if (!title || !title.en || !title.ar) {
      return res.status(400).json({ message: 'Title in both languages is required' });
    }
    if (!description || !description.en || !description.ar) {
      return res.status(400).json({ message: 'Description in both languages is required' });
    }
    if (!price || price < 0) {
      return res.status(400).json({ message: 'Valid price is required' });
    }
    if (!deliveryTime) {
      return res.status(400).json({ message: 'Delivery time is required' });
    }
    
    const services = readJSON('services.json');
    const newService = {
      id: generateId(),
      ...req.body,
      active: true,
      createdAt: new Date().toISOString()
    };
    services.push(newService);
    writeJSON('services.json', services);
    res.status(201).json(newService);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
});

// Update service (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const services = readJSON('services.json');
    const index = services.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Service not found' });
    }
    services[index] = { 
      ...services[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    writeJSON('services.json', services);
    res.json(services[index]);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Failed to update service', error: err.message });
  }
});

// Delete service (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const services = readJSON('services.json');
    const filtered = services.filter(s => s.id !== req.params.id);
    if (filtered.length === services.length) {
      return res.status(404).json({ message: 'Service not found' });
    }
    writeJSON('services.json', filtered);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
