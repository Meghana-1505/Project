// src/Components/SubjectMaterials.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/SubjectMaterials.css';
import Dashboard from './Dashboard';
import LogoutButton from './LogoutButton';


function SubjectMaterials() {
  const { subjectId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const docRef = doc(db, "Subject and Materials", subjectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSubjectName(data.subject || subjectId.replace(/_/g, ' '));

          const materialsArray = (data.materials || []).map(item => {
            const module = Object.keys(item)[0];
            const url = item[module];
            return { module, url };
          });

          const sorted = materialsArray.sort((a, b) => {
            if (a.module?.startsWith("Module") && b.module?.startsWith("Module")) {
              return parseInt(a.module.split(" ")[1]) - parseInt(b.module.split(" ")[1]);
            }
            return (a.module || '').localeCompare(b.module || '');
          });

          setMaterials(sorted);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="subject-materials-page">
        <Dashboard />
        <LogoutButton />
        <h1>Loading materials...</h1>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="subject-materials-page">
        <Dashboard />
        <LogoutButton />
        <h1>No materials found for {subjectName}</h1>
      </div>
    );
  }

  return (
    <div className="subject-materials-page">
      <Dashboard />
      <LogoutButton />
      <h1>Materials for {subjectName}</h1>
      <div className="materials-container">
        {materials.map((material, idx) => (
          <div key={idx} className="material-item">
            <a href={material.url} target="_blank" rel="noopener noreferrer">
              <h2>{material.module}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectMaterials;
