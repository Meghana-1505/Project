import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../Styles/UploadMaterials.css";

function UploadMaterials() {
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [numMaterials, setNumMaterials] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [textbookUrl, setTextbookUrl] = useState("");
  const [modelQPUrl, setModelQPUrl] = useState("");
  const [questionBankUrl, setQuestionBankUrl] = useState("");
  const [specialMaterialName, setSpecialMaterialName] = useState("");
  const [specialMaterialUrl, setSpecialMaterialUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleNumMaterialsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumMaterials(count);
    const emptyMaterials = Array(count).fill().map((_, i) => ({
      module: `Module ${i + 1}`,
      url: ""
    }));
    setMaterials(emptyMaterials);
  };

  const handleMaterialUrlChange = (index, value) => {
    const updated = [...materials];
    updated[index].url = value;
    setMaterials(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload modules
      for (const mat of materials) {
        if (mat.url && mat.url.trim() !== "") {
          await addDoc(collection(db, "materials"), {
            subject,
            module: mat.module,
            url: mat.url.trim(),
            semester,
            year
          });
        }
      }

      // Upload extra materials
      if (textbookUrl.trim() !== "") {
        await addDoc(collection(db, "materials"), {
          subject,
          module: "Textbook",
          url: textbookUrl.trim(),
          semester,
          year
        });
      }

      if (modelQPUrl.trim() !== "") {
        await addDoc(collection(db, "materials"), {
          subject,
          module: "Model Question Paper",
          url: modelQPUrl.trim(),
          semester,
          year
        });
      }

      if (questionBankUrl.trim() !== "") {
        await addDoc(collection(db, "materials"), {
          subject,
          module: "Question Bank",
          url: questionBankUrl.trim(),
          semester,
          year
        });
      }

      if (specialMaterialName.trim() !== "" && specialMaterialUrl.trim() !== "") {
        await addDoc(collection(db, "materials"), {
          subject,
          module: specialMaterialName.trim(),
          url: specialMaterialUrl.trim(),
          semester,
          year
        });
      }

      setSuccessMsg("Materials uploaded successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);

      // Reset form
      setSubject("");
      setSemester("");
      setYear("");
      setNumMaterials(0);
      setMaterials([]);
      setTextbookUrl("");
      setModelQPUrl("");
      setQuestionBankUrl("");
      setSpecialMaterialName("");
      setSpecialMaterialUrl("");
    } catch (error) {
      console.error("Error uploading material: ", error);
      setSuccessMsg("Failed to upload material.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="upload-background">
      <div className="upload-container">
        <h2 className="upload-title">📤 Upload Materials</h2>
        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <label className="upload-label">Select number of modules to upload:</label>
          <select value={numMaterials} onChange={handleNumMaterialsChange}>
            <option value="0">-- Select --</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} Material{n > 1 ? 's' : ''}</option>
            ))}
          </select>

          {numMaterials > 0 && materials.map((mat, index) => (
            <div key={index} className="module-section">
              <strong>{mat.module}</strong>
              <input
                type="url"
                placeholder={`Google Drive Link for ${mat.module}`}
                value={mat.url}
                onChange={(e) => handleMaterialUrlChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          <h4 className="upload-subtitle">📚 Extra Materials (optional)</h4>
          <input
            type="url"
            placeholder="Textbook"
            value={textbookUrl}
            onChange={(e) => setTextbookUrl(e.target.value)}
          />
 
          <input
            type="url"
            placeholder="Model Question Paper"
            value={modelQPUrl}
            onChange={(e) => setModelQPUrl(e.target.value)}
          />

          <input
            type="url"
            placeholder="Question Bank"
            value={questionBankUrl}
            onChange={(e) => setQuestionBankUrl(e.target.value)}
          />

          <h4 className="upload-subtitle">⭐ Special Material (optional)</h4>
          <input
            type="text"
            placeholder="Special Material Name (e.g., Formula Book)"
            value={specialMaterialName}
            onChange={(e) => setSpecialMaterialName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Google Drive Link for Special Material"
            value={specialMaterialUrl}
            onChange={(e) => setSpecialMaterialUrl(e.target.value)}
          />

          <button type="submit">Upload</button>
        </form>
        {successMsg && <p className="upload-success">{successMsg}</p>}
      </div>
    </div>
  );
}

export default UploadMaterials;
