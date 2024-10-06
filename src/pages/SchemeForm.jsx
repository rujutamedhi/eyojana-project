// import React, { useState } from "react";
// import axios from "axios";

// const SchemeForm = () => {
//   const [formData, setFormData] = useState({
//     schemename: "",
//     user_id: "",
//     status:"pending",
//     email: "",
//     category: "",
//     documents: [],
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, documents: e.target.files });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     data.append("schemename", formData.schemename);
//     data.append("user_id", formData.user_id);
//     data.append("email", formData.email);
//     data.append("status", formData.status);
//     data.append("category", formData.category);

//     // Append each document to the form data
//     for (let i = 0; i < formData.documents.length; i++) {
//       data.append("documents", formData.documents[i]);
//       data.append(`document_name_${i}`, formData.documents[i].name); // Optionally use custom names for each file
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/schemes", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Response:", res.data);
//     } catch (err) {
//       console.error(
//         "Error uploading files:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Scheme Name:</label>
//         <input
//           type="text"
//           name="schemename"
//           value={formData.schemename}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label>User ID:</label>
//         <input
//           type="text"
//           name="user_id"
//           value={formData.user_id}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
    
//       <div>
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Documents:</label>
//         <input
//           type="file"
//           name="documents"
//           multiple
//           onChange={handleFileChange}
//           required
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SchemeForm;

import React, { useState } from "react";
import axios from "axios";

const SchemeForm = () => {
  const [formData, setFormData] = useState({
    schemename: "",
    user_id: "",
    email: "",
    status: "pending",
    category: "",
    documents: [], // Array to hold document objects
  });

  // Handler for input changes in the main form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for adding a new document input field
  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    });
  };

  // Handler for updating document name or file
  const handleDocumentChange = (index, e) => {
    const updatedDocuments = [...formData.documents];
    if (e.target.type === "file") {
      updatedDocuments[index].file = e.target.files[0]; // Set the file
    } else {
      updatedDocuments[index].name = e.target.value; // Set the document name
    }
    setFormData({ ...formData, documents: updatedDocuments });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("schemename", formData.schemename);
    data.append("user_id", formData.user_id);
    data.append("email", formData.email);
    data.append("status", formData.status);
    data.append("category", formData.category);

    // Append each document with its name to the form data
    formData.documents.forEach((document, index) => {
      data.append("documents", document.file);
      data.append(`document_name_${index}`, document.name); // Use custom names for each file
    });

    try {
      const res = await axios.post("http://localhost:5000/api/schemes", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Error uploading files:", err.response?.data || err.message);
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

      <h4>Documents:</h4>
      {formData.documents.map((document, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
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
      <button type="button" onClick={addDocument}>
        Add Document
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SchemeForm;
