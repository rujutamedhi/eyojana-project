import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './schemeform.css';
const SchemeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schemeName } = location.state || {};
  const { email } = useAuth(); // Access email from context
  const currentcategory = location.state?.currentcategory || ""; // Use this value directly

  const [formData, setFormData] = useState({
    schemename: schemeName || "",
    user_id: "", // Initially empty, will be set after fetching
    email: email || "", // Use the email from context
    status: "pending",
    category: currentcategory, // Set the category directly from state
    documents: [], // Array to hold document objects
  });

  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${email}`);
        console.log("test10")
        if (response.data.user_id) {
          setFormData((prevData) => ({
            ...prevData,
            user_id: response.data.user_id, // Set user_id from the response
          }));
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setError("Failed to fetch user ID."); // Set error if fetching fails
      }
    };

    if (email) {
      fetchUserId(); // Only fetch if email is available
    }
  }, [email]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    });
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
      const res = await axios.post("http://localhost:5000/api/schemes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", res.data);
      // Optionally navigate or show success message
    } catch (err) {
      setError(err.response?.data.message || err.message); // Set error message to state
      console.error("Error uploading files:", err);
    }
  };

  return (
    <form className="scheme-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Apply for {schemeName}</h2>
      </div>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      
      <div className="form-group" style={{display: "none"}}>
        <label>User ID:</label>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
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
      
      <button type="button" className=" buttons add-document-btn" onClick={addDocument}>
        Add Document
      </button>

      <button type="submit" className="buttons submit-btn">Submit</button>
    </form>
  );
};

export default SchemeForm;
