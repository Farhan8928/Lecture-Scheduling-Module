// routes/instructorRoutes.js
const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Create a new instructor
router.post('/', instructorController.createInstructor);

// Get all instructors
router.get('/', instructorController.getAllInstructors);

// Get a single instructor by ID
router.get('/:id', instructorController.getInstructorById);

// Update an instructor by ID
router.put('/:id', instructorController.updateInstructor);

// Delete an instructor by ID
router.delete('/:id', instructorController.deleteInstructor);

// Get lectures assigned to a specific instructor by ID
router.get('/:id/lectures', instructorController.getAssignedLectures);

// Assuming this is the route to get course details by instructor ID
router.get('/:id/courses', instructorController.getInstructorCourses);



module.exports = router;