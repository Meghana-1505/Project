import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import Dashboard
import '../Styles/Year.css';

// Assuming you have logos for each year
import year1Logo from '../Assets/FirstYear.jpg';
import year2Logo from '../Assets/SecondYear.jpg';
import year3Logo from '../Assets/ThirdYear.jpg';
import year4Logo from '../Assets/FourthYear.jpg';

const Year = () => {
  return (
    <div className="year-page">
      {/* Dashboard button */}
      <Dashboard />

      <h1 className="year-title">Select Year</h1>
      <div className="year-list">
        <Link to="/semester/1" className="year-item">
          <img src={year1Logo} alt="1st Year Logo" className="year-logo" />
          1st Year
        </Link>
        <Link to="/semester/2" className="year-item">
          <img src={year2Logo} alt="2nd Year Logo" className="year-logo" />
          2nd Year
        </Link>
        <Link to="/semester/3" className="year-item">
          <img src={year3Logo} alt="3rd Year Logo" className="year-logo" />
          3rd Year
        </Link>
        <Link to="/semester/4" className="year-item">
          <img src={year4Logo} alt="4th Year Logo" className="year-logo" />
          4th Year
        </Link>
      </div>
    </div>
  );
};

export default Year;
