import React, { useState } from "react";
import axios from "axios";

const SchemeForm = () => {
  const [formData, setFormData] = useState({
    schemename: "",
    user_id: "",
    email: "",
    status: "",
    category: "",
    documents: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("schemename", formData.schemename);
    data.append("user_id", formData.user_id);
    data.append("email", formData.email);
    data.append("status", formData.status);
    data.append("category", formData.category);

    // Append each document to the form data
    for (let i = 0; i < formData.documents.length; i++) {
      data.append("documents", formData.documents[i]);
      data.append(`document_name_${i}`, formData.documents[i].name); // Optionally use custom names for each file
    }

    try {
      const res = await axios.post("http://localhost:5000/api/schemes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", res.data);
    } catch (err) {
      console.error(
        "Error uploading files:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Scheme Name:</label>
        <input
          type="text"
          name="schemename"
          value={formData.schemename}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
    
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Documents:</label>
        <input
          type="file"
          name="documents"
          multiple
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SchemeForm;
