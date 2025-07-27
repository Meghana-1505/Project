import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/SubjectMaterials.css';
import Dashboard from './Dashboard';

function SubjectMaterials() {
  const { subjectId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const q = query(
          collection(db, 'materials'),
          where('subject', '==', subjectId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedMaterials = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort by module number if format is "Module X"
        fetchedMaterials.sort((a, b) => {
          if (a.module?.startsWith("Module") && b.module?.startsWith("Module")) {
            return parseInt(a.module.split(" ")[1]) - parseInt(b.module.split(" ")[1]);
          }
          return (a.module || '').localeCompare(b.module || '');
        });

        setMaterials(fetchedMaterials);
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
        <h1>Loading materials...</h1>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="subject-materials-page">
        <Dashboard />
        <h1>No materials found for {subjectId.replace(/_/g, ' ')}</h1>
      </div>
    );
  }

  return (
    <div className="subject-materials-page">
      <Dashboard />
      <h1>Materials for {subjectId.replace(/_/g, ' ')}</h1>
      <div className="materials-container">
        {materials.map((material) => (
          <div key={material.id} className="material-item">
            <a href={material.url} target="_blank" rel="noopener noreferrer">
              <h2>{material.module}</h2>
            </a>
            <p>Year: {material.year} | Semester: {material.semester}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectMaterials;
