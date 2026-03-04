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

const normalizeStringArray = (value) =>
  asArray(value)
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);

const normalizeImages = (value, fallbackImage = '') => {
  const images = normalizeStringArray(value);
  if (images.length > 0) {
    return images;
  }

  const fallback = typeof fallbackImage === 'string' ? fallbackImage.trim() : '';
  return fallback ? [fallback] : [];
};

const normalizeClient = (value) => {
  const client = normalizeBilingualField(value);
  const normalized = {
    en: client.en,
    ar: client.ar
  };

  if (!normalized.en && normalized.ar) {
    normalized.en = normalized.ar;
  }

  if (!normalized.ar && normalized.en) {
    normalized.ar = normalized.en;
  }

  return normalized;
};

const normalizeExternalLink = (value, fallback = '') => {
  const rawValue = typeof value === 'string' ? value.trim() : '';
  const fallbackValue = typeof fallback === 'string' ? fallback.trim() : '';
  return rawValue || fallbackValue;
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (_err) {
    return false;
  }
};

const validateRequiredProjectFields = ({ title, description, category, client, images, externalLink }) => {
  if (!title.en || !title.ar) {
    return 'Title in both languages is required';
  }

  if (!description.en || !description.ar) {
    return 'Description in both languages is required';
  }

  if (!category) {
    return 'Category is required';
  }

  if (!client.en || !client.ar) {
    return 'Client name in both languages is required';
  }

  if (!images.length) {
    return 'At least one project image is required';
  }

  if (externalLink && !isValidUrl(externalLink)) {
    return 'External link must be a valid URL';
  }

  return null;
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = asArray(readJSON('projects.json'));
    const filtered = category
      ? projects.filter((project) => project.category === category)
      : projects;

    res.json(filtered);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const projects = asArray(readJSON('projects.json'));
    const project = projects.find((entry) => String(entry.id) === String(req.params.id));

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create project (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const title = normalizeBilingualField(req.body.title);
    const description = normalizeBilingualField(req.body.description);
    const category = typeof req.body.category === 'string' ? req.body.category.trim() : '';
    const client = normalizeClient(req.body.client);
    const images = normalizeImages(req.body.images, req.body.image);
    const tags = normalizeStringArray(req.body.tags || req.body.technologies);
    const videos = normalizeStringArray(req.body.videos);
    const externalLink = normalizeExternalLink(req.body.externalLink, req.body.link);
    const featured = Boolean(req.body.featured);

    const validationError = validateRequiredProjectFields({
      title,
      description,
      category,
      client,
      images,
      externalLink
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const projects = asArray(readJSON('projects.json'));
    const newProject = {
      id: generateId(),
      title,
      description,
      category,
      client,
      images,
      tags,
      videos,
      externalLink,
      featured,
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);

    if (!writeJSON('projects.json', projects)) {
      return res.status(500).json({ message: 'Failed to persist project data' });
    }

    return res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
});

// Update project (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const projects = asArray(readJSON('projects.json'));
    const index = projects.findIndex((entry) => String(entry.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const currentProject = projects[index];
    const hasOwn = (field) => Object.prototype.hasOwnProperty.call(req.body, field);

    const title = hasOwn('title')
      ? normalizeBilingualField(req.body.title)
      : normalizeBilingualField(currentProject.title);
    const description = hasOwn('description')
      ? normalizeBilingualField(req.body.description)
      : normalizeBilingualField(currentProject.description);
    const category = hasOwn('category')
      ? (typeof req.body.category === 'string' ? req.body.category.trim() : '')
      : (currentProject.category || '');
    const client = hasOwn('client')
      ? normalizeClient(req.body.client)
      : normalizeClient(currentProject.client);
    const images = hasOwn('images') || hasOwn('image')
      ? normalizeImages(req.body.images, req.body.image)
      : normalizeImages(currentProject.images, currentProject.image);
    const tags = hasOwn('tags') || hasOwn('technologies')
      ? normalizeStringArray(req.body.tags || req.body.technologies)
      : normalizeStringArray(currentProject.tags || currentProject.technologies);
    const videos = hasOwn('videos')
      ? normalizeStringArray(req.body.videos)
      : normalizeStringArray(currentProject.videos);
    const externalLink = hasOwn('externalLink') || hasOwn('link')
      ? normalizeExternalLink(req.body.externalLink, req.body.link)
      : normalizeExternalLink(currentProject.externalLink, currentProject.link);
    const featured = hasOwn('featured') ? Boolean(req.body.featured) : Boolean(currentProject.featured);

    const validationError = validateRequiredProjectFields({
      title,
      description,
      category,
      client,
      images,
      externalLink
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    projects[index] = {
      ...currentProject,
      title,
      description,
      category,
      client,
      images,
      tags,
      videos,
      externalLink,
      featured,
      updatedAt: new Date().toISOString()
    };

    if (!writeJSON('projects.json', projects)) {
      return res.status(500).json({ message: 'Failed to persist project data' });
    }

    return res.json(projects[index]);
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
});

// Delete project (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const projects = asArray(readJSON('projects.json'));
    const filtered = projects.filter((project) => String(project.id) !== String(req.params.id));

    if (filtered.length === projects.length) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!writeJSON('projects.json', filtered)) {
      return res.status(500).json({ message: 'Failed to persist project data' });
    }

    return res.json({ message: 'Project deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
