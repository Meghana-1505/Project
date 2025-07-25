// src/Components/SearchSubjects.js
import React, { useContext, useState } from 'react';
import { SubjectsContext } from './SubjectsContext';
import { Link } from 'react-router-dom';
import '../Styles/SearchSubjects.css';

function SearchSubjects() {
  const { subjects, loading } = useContext(SubjectsContext);
  const [search, setSearch] = useState('');

  if (loading) return null; // hide everything while loading

  const filtered = subjects.filter(subj =>
    subj.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-container">
      <div className="search-bar">
        <span role="img" aria-label="search">🔍</span>
        <input
          type="text"
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Show results only when search has text */}
      {search.trim() !== '' && (
        <div className="search-results">
          {filtered.length > 0 ? (
            filtered.map(subj => (
              <Link
                key={subj.id}
                to={`/year/${subj.year}/semester/${subj.semester}/subject/${subj.id}`}
                className="search-item"
              >
                {subj.name}
              </Link>
            ))
          ) : (
            <p className="no-results">No subjects found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchSubjects;
