import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/InstructorPanel.css";

const InstructorPanel = () => {
  const [assignedLectures, setAssignedLectures] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchInstructors();
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      fetchAssignedCourses(selectedInstructor);
    } else {
      // Clear assigned courses when no instructor is selected
      setAssignedLectures([]);
    }
  }, [selectedInstructor]);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('/api/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchAssignedCourses = async (instructorId) => {
    try {
      setLoading(true); // Set loading state to true while fetching data

      // Fetch assigned courses for the instructor
      const response = await axios.get(`/api/instructors/${instructorId}/courses`);
      const courses = response.data;

      if (courses.length === 0) {
        console.log('No assigned courses found');
      } else {
        setAssignedLectures(courses);
      }
    } catch (error) {
      console.error('Error fetching assigned courses:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  };

  const handleInstructorChange = (e) => {
    const selectedId = e.target.value;
    setSelectedInstructor(selectedId);
  };

  const formatDateIndian = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const indianDate = new Intl.DateTimeFormat('en-IN', options).format(date);
    return indianDate;
  };

  return (
    <div>
      <h1>Instructor Panel</h1>
      <div>
        <label>Select Instructor: </label>
        <select value={selectedInstructor} onChange={handleInstructorChange}>
          <option value="">Select an Instructor</option>
          {instructors.map(instructor => (
            <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
          ))}
        </select>
      </div>
      {selectedInstructor ? (
        <>
          {loading ? ( // Show loading message if data is being fetched
            <p>Loading...</p>
          ) : (
            <>
              {assignedLectures.length > 0 ? ( // Check if there are assigned courses
                <>
                  <h2>Assigned Courses</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedLectures.map(course => (
                        <tr key={course.courseName + course.date + course.time}>
                          <td>{course.courseName}</td>
                          <td>{formatDateIndian(course.date)}</td>
                          <td>{course.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>No assigned courses found</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>Please select an instructor to view assigned courses.</p>
      )}
    </div>
  );
};

export default InstructorPanel;
