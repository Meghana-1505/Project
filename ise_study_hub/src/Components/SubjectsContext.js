// src/Components/SubjectsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const SubjectsContext = createContext();

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Subjects'));
        const subjectsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubjects(subjectsList);
        console.log('Fetched subjects:', subjectsList); // optional debug
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <SubjectsContext.Provider value={{ subjects, loading }}>
      {children}
    </SubjectsContext.Provider>
  );
}
