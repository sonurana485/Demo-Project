import React from 'react';
import './Header.css';


const Header = () => {
  return (
    <header>
      <img src="/logo.png" alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>Overview</li>
          <li className="jobs">
            Jobs
            <span className="arrow"><i className="fas fa-angle-down"></i></span>
            <ul className="nav-list">
              <li>Full-Time</li>
              <li>Internships</li>
            </ul>
          </li>
          <li className="events">
            Events
            <span className="arrow"><i className="fas fa-angle-down"></i></span>
            <ul className="nav-list">
              <li>Job Fair</li>
              <li>Summer Internship</li>
            </ul>
          </li>
          <li className="resources">
            Resources
            <span className="arrow"><i className="fas fa-angle-down"></i></span>
            <ul className="nav-list">
              <li>Career Tips</li>
              <li>OneApp</li>
            </ul>
          </li>
          <li>Resume Maker</li>
          <li className="button">Login/SignUp</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
