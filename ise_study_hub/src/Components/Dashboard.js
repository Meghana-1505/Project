import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDashboard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <button className="dashboard-button" onClick={toggleDashboard}>
        &#9776; {/* Dashboard symbol (three lines) */}
      </button>

      {isOpen && (
        <div className="dashboard-menu">
          <h3>Semesters</h3>
          <Link to="/year/1/semester/1" className="dashboard-link">
            1st Semester
          </Link>
          <Link to="/year/1/semester/2" className="dashboard-link">
            2nd Semester
          </Link>
          <Link to="/year/2/semester/3" className="dashboard-link">
            3rd Semester
          </Link>
          <Link to="/year/2/semester/4" className="dashboard-link">
            4th Semester
          </Link>
          <Link to="/year/3/semester/5" className="dashboard-link">
            5th Semester
          </Link>
          <Link to="/year/3/semester/6" className="dashboard-link">
            6th Semester
          </Link>
          <Link to="/year/4/semester/7" className="dashboard-link">
            7th Semester
          </Link>
          <Link to="/year/4/semester/8" className="dashboard-link">
            8th Semester
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
