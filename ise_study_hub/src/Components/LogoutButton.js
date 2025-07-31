import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // make sure installed
import '../Styles/LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate('/'); // Go back to sign in page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <FiLogOut className="logout-icon" />
      Logout
    </button>
  );
}

export default LogoutButton;
