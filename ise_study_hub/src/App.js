import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Year from './Components/Year';
import Semester from './Components/Semester';
import SemesterSubjects from './Components/SemesterSubjects';
import SubjectMaterials from './Components/SubjectMaterials';
import AdminPanel from './Components/AdminPanel';
import EditMaterials from './Components/EditMaterials';
import AddSubject from './Components/AddSubject';
import UploadMaterials from './Components/UploadMaterials';
import { SubjectsProvider } from './Components/SubjectsContext';

function App() {
  return (
    <SubjectsProvider>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Welcome />} />

          {/* Year and Semester routes */}
          <Route path="/year" element={<Year />} />
          <Route path="/semester/:year" element={<Semester />} />
          <Route path="/year/:year/semester/:semesterId" element={<SemesterSubjects />} />
          <Route path="/year/:year/semester/:semesterId/subject/:subjectId" element={<SubjectMaterials />} />

          {/* Admin routes with /admin prefix */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/add-subject" element={<AddSubject />} />
          <Route path="/admin/upload-materials" element={<UploadMaterials />} />
          <Route path="/admin/edit-materials" element={<EditMaterials />} />
        </Routes>
      </Router>
    </SubjectsProvider>
  );
}

export default App;
