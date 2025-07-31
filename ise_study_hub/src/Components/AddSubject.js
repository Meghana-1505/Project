// src/Components/AddSubject.js
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../Styles/AddSubject.css";

function AddSubject() {
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddSubject = async () => {
    if (!subjectId || !subjectName || !imageURL || !semester || !year) {
      setErrorMsg("❗ Please fill all fields.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    try {
      const docRef = doc(db, "Subject and Materials", subjectId.trim().toLowerCase());
      await setDoc(docRef, {
        subject: subjectName.trim(),
        imageURL: imageURL.trim(),
        semester: semester.trim(),
        year: year.trim(),
        materials: []  // empty initially
      });
      setSuccessMsg("✅ Subject added successfully!");
      setSubjectId(""); setSubjectName(""); setImageURL(""); setSemester(""); setYear("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding subject:", err);
      setErrorMsg("❌ Failed to add subject.");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
    <div className="add-subject-background">
      <div className="add-subject-container">
        <h2>➕ Add New Subject</h2>
        <div className="add-subject-form">
          <input placeholder="Subject ID (e.g., chemistry)" value={subjectId} onChange={e => setSubjectId(e.target.value)} />
          <input placeholder="Subject Name (e.g., Chemistry)" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
          <input placeholder="Image URL" value={imageURL} onChange={e => setImageURL(e.target.value)} />
          <select value={semester} onChange={e => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, idx) => <option key={idx+1} value={String(idx+1)}>{idx+1}</option>)}
          </select>
          <select value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <button onClick={handleAddSubject}>Add Subject</button>
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
