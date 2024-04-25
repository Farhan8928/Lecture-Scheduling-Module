import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "../../styles/LectureForm.css"; // Import the CSS file
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const LectureForm = () => {
  const [lectureData, setLectureData] = useState({
    courseId: '',
    instructorId: '',
    date: '',
    time: '',
  });

  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('/api/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine date and time into a single ISO string
      const datetime = new Date(`${lectureData.date}T${lectureData.time}`).toISOString();
      const data = { ...lectureData, datetime };

      // Check if the selected instructor already has a lecture on the selected date
      const existingLectures = await axios.get(`/api/instructors/${lectureData.instructorId}/lectures?date=${lectureData.date}`);
      if (existingLectures.data.length > 0) {
        toast.error('This instructor already has a lecture scheduled on the selected date', {
          toastStyle: { fontSize: '20px', padding: '20px' } // Custom styles for the toast notification
        });
        return; // Prevent further execution if the instructor already has a lecture on the selected date
      }

      // If the instructor doesn't have a lecture on the selected date, proceed with adding the new lecture
      await axios.post('/api/lectures', data);
      toast.success('Lecture added successfully', {
        toastStyle: { fontSize: '20px', padding: '20px' } // Custom styles for the toast notification
      }); // Display success message
      navigate('/admin'); // Navigate to '/admin' after successful submission
    } catch (error) {
      console.error('Error adding lecture:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Lecture</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course:
          <select name="courseId" value={lectureData.courseId} onChange={handleChange} required>
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
        </label>
        <label>
          Instructor:
          <select name="instructorId" value={lectureData.instructorId} onChange={handleChange} required>
            <option value="">Select an instructor</option>
            {instructors.map(instructor => (
              <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={lectureData.date} onChange={handleChange} required />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={lectureData.time} onChange={handleChange} required />
        </label>
        <button type="submit">Add Lecture</button>
      </form>
    </div>
  );
};

export default LectureForm;
