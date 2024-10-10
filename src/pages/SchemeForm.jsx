import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './schemeform.css';

const SchemeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentcategory = location.state?.currentcategory || "";
  const { email: authEmail } = useAuth(); 
  const [email, setEmail] = useState(authEmail);
  const [applications, setApplications] = useState([]);
  const { schemeName, user_id, documents, _id,docName } = location.state || {};
  const [formData, setFormData] = useState({
    schemename: location.state?.schemeName || "",
    user_id: "", 
    email: email || "", 
    status: "pending",
    category: currentcategory, 
    documents: [],
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

  // Fetch user ID based on email
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${email}`);
        if (response.data.user_id) {
          setFormData((prevData) => ({
            ...prevData,
            user_id: response.data.user_id, 
          }));
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setError("Failed to fetch user ID."); 
      }
    };

    if (email) {
      fetchUserId(); 
    }
  }, [email]);

  // Fetch existing applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/schemes/updatedoc/user/${formData.user_id}/${formData.schemename}`);
        setApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to fetch applications.");
      }
    };

    if (formData.user_id) {
      fetchApplications();
    }
  }, [formData.user_id]);

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
      updatedDocuments[index].file = e.target.files[0];
    } else {
      updatedDocuments[index].name = e.target.value;
    }
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("schemename", formData.schemename);
    data.append("user_id", formData.user_id); 
    data.append("email", formData.email);
    data.append("status", formData.status);
    data.append("category", formData.category);

    formData.documents.forEach((document, index) => {
      if (document.file) {
        data.append("documents", document.file);
        data.append(`document_name_${index}`, document.name); 
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/api/schemes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", res.data);
      setSuccess("Application submitted successfully!"); 
      setApplications((prev) => [...prev, res.data]); // Update applications state
    } catch (err) {
      setError(err.response?.data.message || err.message);
      console.error("Error uploading files:", err);
    }
  };

  return (
    <div>
      <form className="scheme-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Apply for {formData.schemename}</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {/* Display email at the top */}
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

        <h4>Existing Documents:</h4>
        {applications.length === 0 && <p>No existing applications found.</p>}
        {applications.map((app) => (
          <div key={app._id} className="existing-document">
            <strong>{app.schemename}:</strong> 
            {app.documents.map((doc, index) => (
              <span key={index}>
                <a href={`http://localhost:5000/api/schemes/document/${email}/${schemeName}/${docName}`} target="_blank" rel="noopener noreferrer">
                  {doc.document_name}
                </a>
                {index < app.documents.length - 1 && ", "}
              </span>
            ))}
          </div>
        ))}
        
        <h4>Add New Documents:</h4>
        {formData.documents.length === 0 && <p>No documents added.</p>}
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
            {document.file && <span>Uploaded: {document.file.name}</span>}
          </div>
        ))}
        
        <button type="button" className="buttons add-document-btn" onClick={addDocument}>
          Add Document
        </button>

        <button type="submit" className="buttons submit-btn">Submit</button>
      </form>

      <div className="applications-list">
        <h3>Your Applications</h3>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <ul>
            {applications.map((app) => (
              <li key={app._id}>
                <strong>{app.schemename}</strong> - Status: {app.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SchemeForm;
