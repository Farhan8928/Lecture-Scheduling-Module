// controllers/instructorController.js

const Instructor = require('../models/Instructor');
const Lecture = require('../models/Lecture');
const Course = require('../models/Course'); // Adjust the path as per your file structure


exports.createInstructor = async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json({ message: 'Instructor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAssignedLectures = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const { date } = req.query;
    
    // Fetch lectures assigned to the instructor on the specified date
    const assignedLectures = await Lecture.find({ instructorId,date});
    
    res.json(assignedLectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assuming this is the controller method to get courses by instructor ID
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.params.id;
    
    // Fetch lectures assigned to the instructor
    const lectures = await Lecture.find({ instructorId });

    // Map lectures to include course details
    const courses = await Promise.all(lectures.map(async lecture => {
      // Fetch course details
      const course = await Course.findById(lecture.courseId);
      // Return combined object with lecture date and time
      return {
        courseName: course.name,
        date: lecture.date,
        time: lecture.time
      };
    }));

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
