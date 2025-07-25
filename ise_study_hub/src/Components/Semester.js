import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SearchSubjects from './SearchSubjects';
import '../Styles/Semester.css';

import firstSemLogo from '../Assets/Firstsem.jpeg';
import secondSemLogo from '../Assets/Secondsem.jpeg';
import thirdSemLogo from '../Assets/3sem.jpeg';
import fourthSemLogo from '../Assets/4sem.jpeg';
import fifthSemLogo from '../Assets/5sem.jpeg';
import sixthSemLogo from '../Assets/6sem.jpeg';
import seventhSemLogo from '../Assets/7sem.jpeg';
import eighthSemLogo from '../Assets/8sem.jpeg';

function Semester() {
  const { year } = useParams();
  const navigate = useNavigate();

  const semesterData = {
    1: [
      { id: 1, name: "First Semester", logo: firstSemLogo },
      { id: 2, name: "Second Semester", logo: secondSemLogo }
    ],
    2: [
      { id: 3, name: "Third Semester", logo: thirdSemLogo },
      { id: 4, name: "Fourth Semester", logo: fourthSemLogo }
    ],
    3: [
      { id: 5, name: "Fifth Semester", logo: fifthSemLogo },
      { id: 6, name: "Sixth Semester", logo: sixthSemLogo }
    ],
    4: [
      { id: 7, name: "Seventh Semester", logo: seventhSemLogo },
      { id: 8, name: "Eighth Semester", logo: eighthSemLogo }
    ]
  };

  const semesters = semesterData[year] || [];

  return (
    <div className="semester-page">
      <Dashboard />
      <div className="search-container">
        <SearchSubjects />
      </div>
      <div className="semester-right">
        <h1 className="semester-title">{`Year ${year} - Select Semester`}</h1>
        <div className="semester-list">
          {semesters.map((semester) => (
            <div
              key={semester.id}
              onClick={() => navigate(`/year/${year}/semester/${semester.id}`)}
              className="semester-item"
            >
              <img src={semester.logo} alt={semester.name} className="semester-logo" />
              <span>{semester.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Semester;
