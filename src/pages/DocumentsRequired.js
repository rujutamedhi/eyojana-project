import React, { useState } from 'react';
import './DocumentsRequired.css'; // Styling file

const DocumentsRequired = () => {
  const [formData, setFormData] = useState({
    identityProofType: '',
    identityProofImage: null,
    photo: null,
    casteCertificateImage: null,
    incomeCertificateImage: null,
    additionalDocuments: [], // Array to store multiple additional documents
  });

  const [additionalDocumentFields, setAdditionalDocumentFields] = useState([
    { type: '', file: null }
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAdditionalDocumentChange = (index, field, value) => {
    const newFields = [...additionalDocumentFields];
    newFields[index][field] = value;
    setAdditionalDocumentFields(newFields);
  };

  const handleAddMoreDocuments = () => {
    setAdditionalDocumentFields([...additionalDocumentFields, { type: '', file: null }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      additionalDocuments: additionalDocumentFields,
    });
    // Logic to submit the form data to the backend or handle it appropriately
  };

  return (
    <div className="form-container">
      <h2>Applying for the scheme</h2>
      <form className="document-form" onSubmit={handleSubmit}>
        
        {/* Identity Proof Dropdown */}
        <label>
          Identity Proof:
          <select
            name="identityProofType"
            value={formData.identityProofType}
            onChange={handleChange}
            required
          >
            <option value="">Select an Identity Proof</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Passport">Passport</option>
          </select>
        </label>

        {/* Image upload for Identity Proof */}
        <label>
          Upload Identity Proof Image:
          <input
            type="file"
            name="identityProofImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        {/* Photo of the applicant */}
        <label>
          Photo of the applicant:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        {/* Caste Certificate Image Upload */}
        <label>
          Upload Caste Certificate:
          <input
            type="file"
            name="casteCertificateImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        {/* Income Certificate Image Upload */}
        <label>
          Upload Income Certificate:
          <input
            type="file"
            name="incomeCertificateImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        {/* Additional Documents Section */}
        <h3>Additional Documents</h3>
        {additionalDocumentFields.map((field, index) => (
          <div key={index} className="additional-document-group">
            <label>
              Additional Document {index + 1}:
              <select
                value={field.type}
                onChange={(e) =>
                  handleAdditionalDocumentChange(index, 'type', e.target.value)
                }
                required
              >
                <option value="">Select an Additional Document</option>
                <option value="Ration Card">Ration Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
                <option value="Employment Card">Employment Card</option>
                <option value="Birth Certificate">Birth Certificate</option>
                <option value="Domicile Certificate">Domicile Certificate</option>
                <option value="Disability Certificate">Disability Certificate</option>
              </select>
            </label>

            {/* Image upload for Additional Document */}
            <label>
              Upload {field.type} Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleAdditionalDocumentChange(index, 'file', e.target.files[0])
                }
                required
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={handleAddMoreDocuments}>
          Add Another Document
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DocumentsRequired;