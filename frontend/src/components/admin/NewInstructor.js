import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import "../../styles/NewInstructor.css";

const NewInstructor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/instructors', { name, email });
      console.log('New instructor created:', response.data);
      toast.success('Instructor created successfully'); // Display success message
      // Redirect to /admin/instructor
      navigate('/admin/instructors');
    } catch (error) {
      console.error('Error creating instructor:', error);
      setErrorMessage('Failed to create instructor. Please try again.');
    }
  };

  return (
    <div className="new-instructor-form">
      <h2>Create New Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default NewInstructor;
