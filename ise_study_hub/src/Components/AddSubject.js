import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../Styles/AddSubject.css"; // import CSS

function AddSubject() {
  const [subjectId, setSubjectId] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddSubject = async () => {
    if (!subjectId || !name || !imageURL || !semester || !year) {
      setErrorMsg("❗ Please fill all fields.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    try {
      const newDocRef = doc(db, "Subjects", subjectId.trim());
      await setDoc(newDocRef, {
        name: name.trim(),
        imageURL: imageURL.trim(),
        semester: semester.trim(),
        year: year.trim()
      });
      setSuccessMsg("✅ Subject added successfully!");
      setSubjectId(""); setName(""); setImageURL(""); setSemester(""); setYear("");
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
          <input
            type="text"
            placeholder="Subject ID (e.g., advanced_java)"
            value={subjectId}
            onChange={e => setSubjectId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name (e.g., Advanced Java)"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={e => setImageURL(e.target.value)}
          />
          <select value={semester} onChange={e => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, idx) => (
              <option key={idx+1} value={String(idx+1)}>{idx+1}</option>
            ))}
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
