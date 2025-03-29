import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Your logo file
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo & Title */}
      <div className="navbar-logo">
        <Link to="/" className="title-link">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="navbar-title">Sri Kalakshetra Vadhya Sangam</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/courses" className="navbar-link">Courses</Link>
        <Link to="/gallery" className="navbar-link">Gallery</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;