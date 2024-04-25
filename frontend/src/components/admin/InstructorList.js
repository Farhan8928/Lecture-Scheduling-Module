import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import "../../styles/InstructorList.css";

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [editedInstructor, setEditedInstructor] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('/api/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleEdit = (instructor) => {
    setEditedInstructor({ id: instructor._id, name: instructor.name, email: instructor.email });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/instructors/${editedInstructor.id}`, {
        name: editedInstructor.name,
        email: editedInstructor.email
      });
      toast.success('Instructor updated successfully'); // Display success message
      // Update the instructor in the local state
      setInstructors(prevInstructors =>
        prevInstructors.map(inst =>
          inst._id === editedInstructor.id ? { ...inst, name: editedInstructor.name, email: editedInstructor.email } : inst
        )
      );
      // Reset the editedInstructor state
      setEditedInstructor({ id: null, name: '', email: '' });
    } catch (error) {
      console.error('Error updating instructor:', error);
    }
  };

  const handleDelete = async (instructorId) => {
    try {
      await axios.delete(`/api/instructors/${instructorId}`);
      toast.success('Instructor deleted successfully'); // Display success message
      // Remove the deleted instructor from the state
      setInstructors(prevInstructors => prevInstructors.filter(instructor => instructor._id !== instructorId));
    } catch (error) {
      console.error('Error deleting instructor:', error);
    }
  };

  return (
    <div className="instructor-list">
      <div className="list-header">
        <h2>Instructor List</h2>
        <Link to="/admin/new-instructor" className="add-button">Add New Instructor</Link>
      </div>
      <table className="instructor-table">
        <thead>
          <tr>
            <th className="name-header">Name</th>
            <th className="email-header">Email</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map(instructor => (
            <tr key={instructor._id}>
              <td>
                {editedInstructor.id === instructor._id ? (
                  <input
                    type="text"
                    value={editedInstructor.name}
                    onChange={(e) => setEditedInstructor({ ...editedInstructor, name: e.target.value })}
                    className="edit-input"
                  />
                ) : (
                  instructor.name
                )}
              </td>
              <td>
                {editedInstructor.id === instructor._id ? (
                  <input
                    type="email"
                    value={editedInstructor.email}
                    onChange={(e) => setEditedInstructor({ ...editedInstructor, email: e.target.value })}
                    className="edit-input"
                  />
                ) : (
                  instructor.email
                )}
              </td>
              <td>
                {editedInstructor.id === instructor._id ? (
                  <button onClick={handleSave} className="save-button">Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(instructor)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(instructor._id)} className="delete-button">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorList;
