const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

// Enhanced CORS allowing production domain, local dev and Vercel previews
const allowedOrigins = [
  'https://image-drive.tushr.xyz',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // same-origin / curl / mobile apps
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 600
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/folders', require('./routes/folders'));
app.use('/api/images', require('./routes/images'));
app.use('/uploads', express.static('uploads'));

// Basic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  if (err.message.includes('Not allowed by CORS')) {
    return res.status(403).json({ message: 'CORS blocked origin' });
  }
  res.status(500).json({ message: 'Server error' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
