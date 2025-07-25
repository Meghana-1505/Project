import React from 'react';
import '../Styles/AdminPanel.css';  // Correct import
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="admin-background">
      <div className="admin-container">
        <h2>👩‍💻 Admin Panel</h2>
        <div className="admin-buttons">
          <button onClick={() => navigate('/admin/add-subject')}>
            ➕ Add New Subject
          </button>
          <button onClick={() => navigate('/admin/upload-materials')}>
            📤 Upload Materials
          </button>
          <button onClick={() => navigate('/admin/edit-materials')}>
            ✏️ Edit Materials
          </button>
        </div>
      </div>
    </div>
  );
} 

export default AdminPanel;
