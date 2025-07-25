import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import '../Styles/Welcome.css';  
import logo from '../Assets/logo.webp'; 

const Welcome = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleStart = () => {
    navigate('/year');  // Navigate to Year page when button is clicked
  };

  return (
    <div className="welcome-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="welcome-message">
        <h1>Welcome to ISE Study Hub</h1>
        <p>
        This website offers a comprehensive collection of study materials tailored to the NIE College academic curriculum, supporting students with resources organized by year and semester.
       </p>
      </div>
      <button onClick={handleStart} className="start-button">
        Get Started
      </button> {/* Button to navigate */}
    </div>
  );
};

export default Welcome;