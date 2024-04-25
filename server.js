// server.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const courseRoutes = require('./routes/courseRoutes'); // Import course routes
const instructorRoutes = require('./routes/instructorRoutes'); // Import instructor routes
const lectureRoutes = require('./routes/lectureRoutes'); // Import lecture routes

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Mount course routes
app.use('/api/courses', courseRoutes);
// Mount instructor routes
app.use('/api/instructors', instructorRoutes);
// Mount lecture routes
app.use('/api/lectures', lectureRoutes);
