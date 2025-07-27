import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/SubjectMaterials.css';
import Dashboard from './Dashboard';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function SubjectMaterials() {
  const { subjectId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false); // optional: show loading for zip

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

  const handleDownloadZip = async () => {
    if (materials.length === 0) return;

    setDownloading(true);
    const zip = new JSZip();

    for (const material of materials) {
      try {
        // Extract file ID from Google Drive link
        const fileId = material.url.match(/\/d\/(.*?)\//)?.[1];
        if (!fileId) continue;

        // Direct download link
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const response = await fetch(downloadUrl);
        const blob = await response.blob();

        // Add to zip: name it by module
        zip.file(`${material.module}.pdf`, blob);
      } catch (error) {
        console.error(`Failed to download ${material.module}:`, error);
      }
    }

    // Generate and download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${subjectId.replace(/_/g, ' ')}_materials.zip`);
      setDownloading(false);
    }).catch((error) => {
      console.error('Failed to generate zip:', error);
      setDownloading(false);
    });
  };

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
      <button onClick={handleDownloadZip} disabled={downloading}>
        {downloading ? "Preparing ZIP..." : "📦 Download All as ZIP"}
      </button>
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
