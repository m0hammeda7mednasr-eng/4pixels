const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

const normalizeFilename = (value) => path.basename(String(value || '').trim());

// Upload single image
router.post('/single', auth, adminAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload image', error: err.message });
  }
});

// Upload multiple images
router.post('/multiple', auth, adminAuth, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({
      success: true,
      urls: fileUrls,
      count: req.files.length
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload images', error: err.message });
  }
});

// Delete image
router.delete('/:filename', auth, adminAuth, (req, res) => {
  try {
    const filename = normalizeFilename(req.params.filename);
    if (!filename || filename !== req.params.filename) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
});

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'Image is too large. Maximum size is 5MB.' });
    }

    return res.status(400).json({ message: err.message || 'Upload failed' });
  }

  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({ message: err.message });
  }

  console.error('Upload route error:', err.message);
  return res.status(500).json({ message: 'Upload failed' });
});

module.exports = router;
