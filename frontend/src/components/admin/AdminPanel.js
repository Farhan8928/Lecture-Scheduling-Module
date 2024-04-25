import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/AdminPanel.css"; // Import the CSS file

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-heading">Admin Panel</h1>
      <div className="admin-card-container">
        <div className="admin-row">
          <div className="admin-card">
            <h2 className="admin-section-heading">Add New Course</h2>
            <Link to="/admin/add-course" className="admin-link">
              <button className="admin-button">Add Course</button>
            </Link>
          </div>
          <div className="admin-card">
            <h2 className="admin-section-heading">Add New Lecture</h2>
            <Link to="/admin/add-lecture" className="admin-link">
              <button className="admin-button">Add Lecture</button>
            </Link>
          </div>
        </div>
        <div className="admin-row">
          <div className="admin-card">
            <h2 className="admin-section-heading">List of Instructors</h2>
            <Link to="/admin/instructors" className="admin-link">
              <button className="admin-button">View Instructors</button>
            </Link>
          </div>
          <div className="admin-card">
            <h2 className="admin-section-heading">Assigned Lectures List</h2>
            <Link to="/admin/assigned-lectures" className="admin-link">
              <button className="admin-button">Assigned Lecture</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
