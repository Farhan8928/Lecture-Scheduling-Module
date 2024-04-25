const Lecture = require('../models/Lecture');

// Function to create a new lecture
exports.createLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date, time } = req.body;
    const lecture = new Lecture({ courseId, instructorId, date, time });
    await lecture.save();
    res.status(201).json(lecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to get all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find();
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to get a single lecture by ID
exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json(lecture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to update a lecture by ID
exports.updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to delete a lecture by ID
exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json({ message: 'Lecture deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAssignedLectures = async (req, res) => {
  try {
    // Assuming you have some authentication mechanism to get the instructor's ID
    const instructorId = req.user.id; // Assuming the instructor ID is available in the request

    // Retrieve lectures assigned to the instructor and populate the instructor field to get the instructor's name
    const lectures = await Lecture.find({ instructorId }).populate('instructor', 'name');

    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

