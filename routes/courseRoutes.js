// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/', courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Update a course by ID
router.put('/:id', courseController.updateCourse);

// Delete a course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
