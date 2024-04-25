import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <h2>Admin Panel</h2>
          <Link to="/admin">Go to Admin Panel</Link>
        </div>
        <div className="card">
          <h2>Instructor Panel</h2>
          <Link to="/instructor">Go to Instructor Panel</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
