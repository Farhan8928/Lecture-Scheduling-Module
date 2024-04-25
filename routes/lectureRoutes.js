// routes/lectureRoutes.js

const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

// Import middleware for authentication if needed
// const authenticate = require('../middleware/authenticate');

// Create a new lecture
router.post('/', lectureController.createLecture);

// Get all lectures
router.get('/', lectureController.getAllLectures);

// Get a single lecture by ID
router.get('/:id', lectureController.getLectureById);

// Update a lecture by ID
router.put('/:id', lectureController.updateLecture);

// Delete a lecture by ID
router.delete('/:id', lectureController.deleteLecture);

// Get assigned lectures for the logged-in instructor
router.get('/', lectureController.getAssignedLectures);

module.exports = router;
