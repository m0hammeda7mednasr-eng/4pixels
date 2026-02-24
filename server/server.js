const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware - CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://4pixels-two.vercel.app',
  'https://4pixels-git-main-mohs-projects-0b03337a.vercel.app',
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Allow all Vercel deployments
    if (origin && origin.includes('vercel.app')) {
      console.log('✅ CORS allowed for Vercel:', origin);
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      console.log('📋 Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/content', require('./routes/content'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/shopify', require('./routes/shopify'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ Four Pixels API is running!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server running on port ' + PORT);
  console.log('🌍 Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('🔐 JWT Secret:', process.env.JWT_SECRET ? '✅ Configured' : '❌ Missing');
  console.log('✅ Using local JSON database');
  console.log('🔗 Allowed origins:', allowedOrigins.join(', '));
  console.log('📧 Admin Email: Mohammedahmed@gmail.com');
  console.log('🔑 Admin Password: 01066184859Mm#');
});
