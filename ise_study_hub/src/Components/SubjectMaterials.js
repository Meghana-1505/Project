import React from 'react';
import { useParams } from 'react-router-dom';
import { materialsData } from '../Data/Materials';
import '../Styles/SubjectMaterials.css';
import Dashboard from './Dashboard';

function SubjectMaterials() {
  const { subjectId } = useParams();
  const materials = materialsData[subjectId];

  if (!materials) {
    return (
      <div className="subject-materials-page">
        <h1>No materials found for {subjectId}</h1>
      </div>
    );
  }

  return (
    <div className="subject-materials-page">
       <Dashboard />
      <h1>Materials for {subjectId}</h1>
      <div className="materials-container">
        {materials.map((material, index) => (
          <div key={index} className="material-item">
            <a href={material.link} target="_blank" rel="noopener noreferrer">
              <h2>{material.title}</h2>
            </a>
            <p>{material.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectMaterials;
