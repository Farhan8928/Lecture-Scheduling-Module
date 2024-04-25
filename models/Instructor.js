// models/Instructor.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add any other fields you want for the Instructor model
});

module.exports = mongoose.model('Instructor', instructorSchema);
