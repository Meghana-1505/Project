import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../Styles/EditMaterials.css";

function EditMaterials() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedModuleName, setEditedModuleName] = useState("");
  const [editedUrl, setEditedUrl] = useState("");
  const [materialMessages, setMaterialMessages] = useState({});

  // Fetch subjects when year & semester change
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedYear || !selectedSemester) {
        setSubjects([]);
        return;
      }
      try {
        const q = query(
          collection(db, "Subject and Materials"),
          where("year", "==", selectedYear),
          where("semester", "==", selectedSemester)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(docSnap => ({
          id: docSnap.id,                     // doc id for value
          subject: docSnap.data().subject     // subject name for display
        }));
        setSubjects(fetched);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, [selectedYear, selectedSemester]);

  const showMaterialMessage = (index, message) => {
    setMaterialMessages(prev => ({ ...prev, [index]: message }));
    setTimeout(() => {
      setMaterialMessages(prev => ({ ...prev, [index]: "" }));
    }, 2000);
  };

  // Fetch materials for selected subject
  const fetchMaterials = async () => {
    if (!selectedSubjectId) {
      alert("Please select a subject!");
      return;
    }
    try {
      const docRef = doc(db, "Subject and Materials", selectedSubjectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMaterials(docSnap.data().materials || []);
      } else {
        alert("No materials found.");
      }
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

  // Start editing mode
  const startEditing = (index) => {
    const oldEntry = materials[index];
    const oldModuleName = Object.keys(oldEntry)[0];
    const oldUrl = oldEntry[oldModuleName];
    setEditedModuleName(oldModuleName);
    setEditedUrl(oldUrl);
    setEditingIndex(index);
  };

  // Save updated module name and URL
  const handleUpdate = async (index) => {
    const oldEntry = materials[index];
    const updatedEntry = { [editedModuleName.trim()]: editedUrl.trim() };
    try {
      const docRef = doc(db, "Subject and Materials", selectedSubjectId);
      await updateDoc(docRef, {
        materials: arrayRemove(oldEntry)
      });
      await updateDoc(docRef, {
        materials: arrayUnion(updatedEntry)
      });
      showMaterialMessage(index, "✅ Updated!");
      setEditingIndex(null);
      fetchMaterials();
    } catch (err) {
      console.error("Update failed:", err);
      showMaterialMessage(index, "❌ Failed.");
    }
  };

  // Delete material
  const handleDelete = async (index) => {
    const oldEntry = materials[index];
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const docRef = doc(db, "Subject and Materials", selectedSubjectId);
      await updateDoc(docRef, {
        materials: arrayRemove(oldEntry)
      });
      showMaterialMessage(index, "✅ Deleted!");
      fetchMaterials();
    } catch (err) {
      console.error("Delete failed:", err);
      showMaterialMessage(index, "❌ Failed.");
    }
  };

  return (
    <div className="edit-materials-background">
      <div className="edit-materials-container">
        <h2>✏️ Edit Materials</h2>

        <div className="edit-materials-form">
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, idx) => (
              <option key={idx + 1} value={String(idx + 1)}>{idx + 1}</option>
            ))}
          </select>
          <select value={selectedSubjectId} onChange={e => setSelectedSubjectId(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map(subj => (
              <option key={subj.id} value={subj.id}>{subj.subject}</option>
            ))}
          </select>
          <button onClick={fetchMaterials}>Fetch Materials</button>
        </div>

        {materials.length > 0 && materials.map((mat, idx) => {
          const moduleName = Object.keys(mat)[0];
          const url = mat[moduleName];
          return (
            <div key={idx} className="material-card">
              {editingIndex === idx ? (
                <>
                  <input
                    type="text"
                    value={editedModuleName}
                    onChange={e => setEditedModuleName(e.target.value)}
                    placeholder="Module Name"
                  />
                  <input
                    type="url"
                    value={editedUrl}
                    onChange={e => setEditedUrl(e.target.value)}
                    placeholder="Material URL"
                  />
                  <div className="material-actions">
                    <button className="save-btn" onClick={() => handleUpdate(idx)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>{moduleName}</strong></p>
                  <a href={url} target="_blank" rel="noreferrer">{url}</a>
                  <div className="material-actions">
                    <button onClick={() => startEditing(idx)}>Edit</button>
                    <button onClick={() => handleDelete(idx)}>Delete</button>
                  </div>
                </>
              )}
              {materialMessages[idx] && <p className="material-message">{materialMessages[idx]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EditMaterials;
