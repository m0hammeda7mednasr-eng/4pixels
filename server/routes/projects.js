const express = require('express');
const { readJSON, writeJSON, generateId } = require('../db');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = readJSON('projects.json');
    const filtered = category ? projects.filter(p => p.category === category) : projects;
    res.json(filtered);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const projects = readJSON('projects.json');
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    // Validation
    if (!title || !title.en || !title.ar) {
      return res.status(400).json({ message: 'Title in both languages is required' });
    }
    if (!description || !description.en || !description.ar) {
      return res.status(400).json({ message: 'Description in both languages is required' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    
    const projects = readJSON('projects.json');
    const newProject = {
      id: generateId(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    writeJSON('projects.json', projects);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
});

// Update project (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const projects = readJSON('projects.json');
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    projects[index] = { 
      ...projects[index], 
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    writeJSON('projects.json', projects);
    res.json(projects[index]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
});

// Delete project (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const projects = readJSON('projects.json');
    const filtered = projects.filter(p => p.id !== req.params.id);
    if (filtered.length === projects.length) {
      return res.status(404).json({ message: 'Project not found' });
    }
    writeJSON('projects.json', filtered);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
