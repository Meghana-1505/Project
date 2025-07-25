import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/SemesterSubjects.css';
import Dashboard from './Dashboard';
import SearchSubjects from './SearchSubjects';

const SemesterSubjects = () => {
  const { year, semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const q = query(
          collection(db, "Subjects"),
          where("year", "==", year),
          where("semester", "==", semesterId)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubjects(fetched);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [year, semesterId]);

  const filteredSubjects = subjects.filter(subject =>
    subject.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="semester-subjects">
      <Dashboard />
      <SearchSubjects search={searchText} setSearch={setSearchText} />
      <h1>{`Subjects for Semester ${semesterId}`}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredSubjects.length === 0 ? (
        <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>No subjects found.</p>
      ) : (
        <div className="subjects-list">
          {filteredSubjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/year/${year}/semester/${semesterId}/subject/${subject.id}`}
              className="subject-item"
            >
              <img src={subject.imageURL} alt={subject.name} className="subject-image" />
              <span>{subject.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SemesterSubjects;
