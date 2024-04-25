import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Dashboard</Link> {/* Added Dashboard link */}
        </li>
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Admin Panel</Link>
        </li>
        <li className="navbar-item">
          <Link to="/instructor" className="navbar-link">Instructor Panel</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
