import React, { useState, useEffect } from "react";
import axios from "axios";

const EditForm = ({ schemeData, onClose }) => {
  const [formData, setFormData] = useState({
    schemename: schemeData?.schemename || "",
    user_id: schemeData?.user_id || "",
    email: schemeData?.email || "",
    status: schemeData?.status || "pending",
    category: schemeData?.category || "",
    documents: schemeData?.documents || [],
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDocumentChange = (index, e) => {
    const updatedDocuments = [...formData.documents];
    if (e.target.type === "file") {
      updatedDocuments[index].file = e.target.files[0]; // Set the file
    } else {
      updatedDocuments[index].name = e.target.value; // Set the document name
    }
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data to FormData object
    data.append("schemename", formData.schemename);
    data.append("user_id", formData.user_id); // Use the fetched user_id
    data.append("email", formData.email);
    data.append("status", formData.status);
    data.append("category", formData.category);

    // Append each document with its name to the form data
    formData.documents.forEach((document, index) => {
      if (document.file) {
        data.append("documents", document.file);
        data.append(`document_name_${index}`, document.name); // Use custom names for each file
      }
    });

    try {
      const res = await axios.put(`http://localhost:5000/api/schemes/${schemeData._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Application updated successfully!");
      console.log("Updated successfully:", res.data);
    } catch (err) {
      setError(err.response?.data.message || err.message);
      console.error("Error updating scheme:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit {formData.schemename}</h2>
      {error && <div className="error-message">{error}</div>} {/* Error display */}
      {success && <div className="success-message">{success}</div>} {/* Success display */}

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          readOnly
        />
      </div>

      <h4>Documents:</h4>
      {formData.documents.map((document, index) => (
        <div key={index} className="document-input-group">
          <input
            type="text"
            placeholder="Document Name"
            value={document.name}
            onChange={(e) => handleDocumentChange(index, e)}
            required
          />
          <input
            type="file"
            onChange={(e) => handleDocumentChange(index, e)}
            required
          />
        </div>
      ))}

      <button type="button" className="buttons add-document-btn" onClick={addDocument}>
        Add Document
      </button>

      <button type="submit" className="buttons submit-btn">Save Changes</button>
      <button type="button" className="buttons cancel-btn" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditForm;
