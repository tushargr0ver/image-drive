const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

// Minimal CORS: only allow production frontend
app.use(cors({ origin: 'https://image-drive.tushr.xyz' }));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/folders', require('./routes/folders'));
app.use('/api/images', require('./routes/images'));
app.use('/uploads', express.static('uploads'));

// Basic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Server error' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
