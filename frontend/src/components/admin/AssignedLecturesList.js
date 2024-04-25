import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../styles/AssignedLecturesList.css";
import InstructorPanel from '../instructure/InstructorPanel';

const AssignedLecturesList = () => {
  const [assignedLectures, setAssignedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedLectures();
  }, []);

  const fetchAssignedLectures = async () => {
    try {
      const response = await axios.get('/api/lectures');
      const lecturesData = response.data;

      const lecturesWithDetails = await Promise.all(lecturesData.map(async lecture => {
        const courseResponse = await axios.get(`/api/courses/${lecture.courseId}`);
        const courseName = courseResponse.data.name;

        // Get instructor name using the InstructorPanel component API
        const instructorName = await getInstructorName(lecture.instructorId);

        const date = lecture.date ? new Date(lecture.date) : null;
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' };
        const formattedDate = date ? date.toLocaleDateString('en-IN', options) : '';

        return { ...lecture, course: courseName, instructor: instructorName, date: formattedDate };
      }));

      setAssignedLectures(lecturesWithDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assigned lectures:', error);
      setLoading(false);
    }
  };

  const getInstructorName = async (instructorId) => {
    try {
      const response = await axios.get(`/api/instructors/${instructorId}`);
      return response.data.name;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return 'Unknown Instructor'; // Return a default value for unknown instructors
      } else {
        console.error('Error fetching instructor name:', error);
        return 'Error';
      }
    }
  };

  const handleEdit = (lectureId) => {
    navigate(`/admin/add-lecture`);
  };

  const handleDelete = async (lectureId) => {
    try {
      await axios.delete(`/api/lectures/${lectureId}`);
      fetchAssignedLectures();
      toast.success('Lecture deleted successfully');
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  return (
    <div className="assigned-lectures-container">
      <h2>Assigned Lectures</h2>
      <InstructorPanel />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedLectures.map(lecture => (
              <tr key={lecture._id}>
                <td>{lecture.course}</td>
                <td>{lecture.instructor}</td>
                <td>{lecture.date}</td>
                <td>{lecture.time}</td>
                <td>
                  <button onClick={() => handleEdit(lecture._id)}>Edit</button>
                  <button onClick={() => handleDelete(lecture._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedLecturesList;
