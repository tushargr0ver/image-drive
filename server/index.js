const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/folders', require('./routes/folders'));
app.use('/api/images', require('./routes/images'));
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
