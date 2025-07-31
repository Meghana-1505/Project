import React, { useState } from "react";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../Styles/UploadMaterials.css";

function UploadMaterials() {
  const [subjectId, setSubjectId] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [numModules, setNumModules] = useState(0);
  const [modules, setModules] = useState([]);
  const [textbookUrl, setTextbookUrl] = useState("");
  const [modelQPUrl, setModelQPUrl] = useState("");
  const [questionBankUrl, setQuestionBankUrl] = useState("");
  const [specialMaterialName, setSpecialMaterialName] = useState("");
  const [specialMaterialUrl, setSpecialMaterialUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleNumModulesChange = (e) => {
    const count = parseInt(e.target.value);
    setNumModules(count);
    setModules(Array(count).fill(""));
  };

  const handleModuleUrlChange = (index, value) => {
    const updated = [...modules];
    updated[index] = value;
    setModules(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectId || !semester || !year) {
      alert("Please fill Subject ID, Semester & Year.");
      return;
    }
    try {
      const docRef = doc(db, "Subject and Materials", subjectId.trim().toLowerCase());

      // ensure doc exists with semester/year fields (only creates if not exists)
      await setDoc(docRef, {
        semester: semester.trim(),
        year: year.trim(),
        subject: subjectId.trim(),  // optional: keep subject name same as id
      }, { merge: true });

      const newMaterials = [];

      modules.forEach((url, idx) => {
        if (url.trim()) newMaterials.push({ [`Module ${idx+1}`]: url.trim() });
      });

      if (textbookUrl.trim()) newMaterials.push({ "Textbook": textbookUrl.trim() });
      if (modelQPUrl.trim()) newMaterials.push({ "Model Question Paper": modelQPUrl.trim() });
      if (questionBankUrl.trim()) newMaterials.push({ "Question Bank": questionBankUrl.trim() });
      if (specialMaterialName.trim() && specialMaterialUrl.trim()) {
        newMaterials.push({ [specialMaterialName.trim()]: specialMaterialUrl.trim() });
      }

      for (const mat of newMaterials) {
        await updateDoc(docRef, { materials: arrayUnion(mat) });
      }

      setSuccessMsg("✅ Materials uploaded successfully!");
      // Reset
      setNumModules(0); setModules([]);
      setTextbookUrl(""); setModelQPUrl(""); setQuestionBankUrl("");
      setSpecialMaterialName(""); setSpecialMaterialUrl("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error uploading materials:", err);
      setSuccessMsg("❌ Failed to upload materials.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="upload-background">
      <div className="upload-container">
        <h2 className="upload-title">📤 Upload Materials</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input placeholder="Subject ID (e.g., chemistry)" value={subjectId} onChange={e => setSubjectId(e.target.value)} required />
          <input placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} required />
          <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />

          <label>Select number of modules to upload:</label>
          <select value={numModules} onChange={handleNumModulesChange}>
            <option value="0">-- Select --</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Module{n>1?"s":""}</option>)}
          </select>

          {modules.map((url, idx) => (
            <input key={idx} placeholder={`Module ${idx+1} Google Drive Link`} value={url} onChange={e => handleModuleUrlChange(idx, e.target.value)} />
          ))}

          <h4 className="upload-subtitle">📚 Extra Materials (optional)</h4>
          <input placeholder="Textbook Google Drive Link" value={textbookUrl} onChange={e => setTextbookUrl(e.target.value)} />
          <input placeholder="Model Question Paper Google Drive Link" value={modelQPUrl} onChange={e => setModelQPUrl(e.target.value)} />
          <input placeholder="Question Bank Google Drive Link" value={questionBankUrl} onChange={e => setQuestionBankUrl(e.target.value)} />

          <h4 className="upload-subtitle">⭐ Special Material (optional)</h4>
          <input placeholder="Special Material Name (e.g., Formula Book)" value={specialMaterialName} onChange={e => setSpecialMaterialName(e.target.value)} />
          <input placeholder="Special Material Google Drive Link" value={specialMaterialUrl} onChange={e => setSpecialMaterialUrl(e.target.value)} />

          <button type="submit">Upload</button>
        </form>
        {successMsg && <p className="upload-success">{successMsg}</p>}
      </div>
    </div>
  );
}

export default UploadMaterials;
