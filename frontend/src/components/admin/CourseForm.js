import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import "../../styles/CourseForm.css";

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    name: '',
    level: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses', courseData);
      toast.success('Course added successfully'); // Display success message
      navigate('/admin'); // Redirect to /admin after adding the course
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={courseData.name} onChange={handleChange} required />
        </label>
        <label>
          Level:
          <input type="text" name="level" value={courseData.level} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={courseData.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={courseData.image} onChange={handleChange} required />
        </label>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
