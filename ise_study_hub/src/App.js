import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome'; // Import Welcome component
import Year from './Components/Year';
import Semester from './Components/Semester';
import SemesterSubjects from './Components/SemesterSubjects'; // Import SemesterSubjects component
import SubjectMaterials from './Components/SubjectMaterials';

function App() {
  return (
    <Router>
      <Routes>
        {/* Set Welcome as the default route */}
        <Route path="/" element={<Welcome />} /> {/* This will load Welcome first */}
        
        {/* Year Page with Dashboard */}
        <Route path="/year" element={<Year />} />

        {/* Semester and SemesterSubjects navigation */}
        <Route path="/semester/:year" element={<Semester />} />
        <Route path="/year/:year/semester/:semesterId" element={<SemesterSubjects />} />
        <Route path="/year/:year/semester/:semesterId/subject/:subjectId" element={<SubjectMaterials />} />
      </Routes>
    </Router>
  );
}

export default App;
