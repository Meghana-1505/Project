// src/Components/EditMaterials.js
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../Styles/EditMaterials.css";

function EditMaterials() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [materialMessages, setMaterialMessages] = useState({}); // local messages per material

  // Fetch subjects when year & semester are selected
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedYear || !selectedSemester) {
        setSubjects([]);
        return;
      }
      try {
        const q = query(
          collection(db, "Subjects"),
          where("year", "==", selectedYear),
          where("semester", "==", selectedSemester)
        );
        const snapshot = await getDocs(q);
        const fetchedSubjects = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setSubjects(fetchedSubjects);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, [selectedYear, selectedSemester]);

  // Helper: show message for specific material
  const showMaterialMessage = (materialId, message) => {
    setMaterialMessages(prev => ({ ...prev, [materialId]: message }));
    setTimeout(() => {
      setMaterialMessages(prev => ({ ...prev, [materialId]: "" }));
    }, 3000);
  };

  // Fetch materials
  const fetchMaterials = async () => {
    if (!selectedYear || !selectedSemester || !selectedSubject) {
      alert("Please select Year, Semester, and Subject first.");
      return;
    }
    setLoading(true);
    try {
      const q = query(
        collection(db, "materials"),
        where("year", "==", selectedYear),
        where("semester", "==", selectedSemester),
        where("subject", "==", selectedSubject.trim())
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      fetched.sort((a, b) => {
        if (a.module?.startsWith("Module") && b.module?.startsWith("Module")) {
          return parseInt(a.module.split(" ")[1]) - parseInt(b.module.split(" ")[1]);
        }
        return (a.module || '').localeCompare(b.module || '');
      });
      setMaterials(fetched);
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update material
  const handleUpdate = async (materialId, updatedModule, updatedUrl) => {
    try {
      const docRef = doc(db, "materials", materialId);
      await updateDoc(docRef, { module: updatedModule.trim(), url: updatedUrl.trim() });
      showMaterialMessage(materialId, "Material updated successfully!");
      setEditingId(null);
      fetchMaterials();
    } catch (err) {
      console.error("Error updating:", err);
      showMaterialMessage(materialId, "Failed to update material.");
    }
  };

  // Delete material
  const handleDelete = async (materialId) => {
    if (!window.confirm("Are you sure to delete this material?")) return;
    try {
      await deleteDoc(doc(db, "materials", materialId));
      showMaterialMessage(materialId, "Material deleted!");
      fetchMaterials();
    } catch (err) {
      console.error("Error deleting:", err);
      showMaterialMessage(materialId, "Failed to delete material.");
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
            <option key={idx+1} value={String(idx+1)}>{idx+1}</option>
          ))}
        </select>
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map(subj => (
            <option key={subj.id} value={subj.id}>{subj.name}</option>
          ))}
        </select>
        <button onClick={fetchMaterials}>Fetch Materials</button>
      </div>

      {loading && <p>Loading...</p>}

      {materials.length > 0 && (
        <div>
          <h3>Materials List</h3>
          {materials.map(mat => (
            <div key={mat.id} className="material-card">
              {editingId === mat.id ? (
                <>
                  <input
                    type="text"
                    value={mat.module}
                    onChange={e =>
                      setMaterials(prev =>
                        prev.map(m => m.id === mat.id ? { ...m, module: e.target.value } : m)
                      )
                    }
                  />
                  <input
                    type="url"
                    value={mat.url}
                    onChange={e =>
                      setMaterials(prev =>
                        prev.map(m => m.id === mat.id ? { ...m, url: e.target.value } : m)
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <p><strong>Module:</strong> {mat.module}</p>
                  <p><strong>URL:</strong> <a href={mat.url} target="_blank" rel="noopener noreferrer">{mat.url}</a></p>
                </>
              )}
              <div className="material-actions">
                <button onClick={() => setEditingId(mat.id)}>Edit</button>
                <button onClick={() => handleUpdate(mat.id, mat.module, mat.url)} disabled={editingId !== mat.id}>Save</button>
                <button onClick={() => handleDelete(mat.id)}>Delete</button>
              </div>
              {materialMessages[mat.id] && (
                <p className="material-message" style={{
                  color: materialMessages[mat.id].startsWith ? "red" :
                        materialMessages[mat.id].startsWith ? "orange" :
                        "green"
                }}>
                  {materialMessages[mat.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default EditMaterials;
