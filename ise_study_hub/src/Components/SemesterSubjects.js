import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/SemesterSubjects.css';
import Dashboard from './Dashboard';
import SearchSubjects from './SearchSubjects';
import LogoutButton from './LogoutButton';


const SemesterSubjects = () => {
  const { year, semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const q = query(
          collection(db, 'Subject and Materials'),
          where('year', '==', year),
          where('semester', '==', semesterId)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,                       // keep id for navigation
          subject: doc.data().subject,      // use 'subject' field for display
          imageURL: doc.data().imageURL
        }));
        setSubjects(fetched);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [year, semesterId]);

  const filteredSubjects = subjects.filter(subject =>
    subject.subject?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="semester-subjects-page">
      <Dashboard />
      <LogoutButton />
      <SearchSubjects search={searchText} setSearch={setSearchText} />
      <h1 className="semester-title">{`Subjects for Semester ${semesterId}`}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredSubjects.length === 0 ? (
        <p className="no-subjects">No subjects found.</p>
      ) : (
        <div className="subjects-list">
          {filteredSubjects.map(subject => (
            <Link
              key={subject.id}
              to={`/year/${year}/semester/${semesterId}/subject/${subject.id}`}
              className="subject-card"
            >
              <img src={subject.imageURL} alt={subject.subject} className="subject-image" />
              <div className="subject-name">{subject.subject}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SemesterSubjects;
