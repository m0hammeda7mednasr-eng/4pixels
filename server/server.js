const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getJwtSecret } = require('./utils/jwt');

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  try {
    getJwtSecret();
  } catch (err) {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  }
}

const allowedOrigins = new Set(
  [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://4pixels-two.vercel.app',
    'https://4pixels-git-main-mohs-projects-0b03337a.vercel.app',
    process.env.CORS_ORIGIN,
    process.env.FRONTEND_URL,
    process.env.CLIENT_URL
  ]
    .flatMap((origin) => String(origin || '').split(','))
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === 'true';
const isVercelPreviewOrigin = (origin) => {
  try {
    return new URL(origin).hostname.endsWith('.vercel.app');
  } catch (_err) {
    return false;
  }
};

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    if (allowVercelPreviews && isVercelPreviewOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

if (!isProduction) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/content', require('./routes/content'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/shopify', require('./routes/shopify'));

// Health checks
app.get('/', (_req, res) => {
  res.json({ message: 'Four Pixels API is running' });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/*', (_req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use((err, _req, res, _next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS blocked this origin' });
  }

  console.error('Unhandled server error:', err.message);
  return res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origins: ${Array.from(allowedOrigins).join(', ') || 'None configured'}`);
});
