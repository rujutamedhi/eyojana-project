import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css'; // For styling

const Modal = ({ application, onClose }) => {
  const [status, setStatus] = useState(application.status);

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/schemes/update-status/${application.email}`, { status });
      alert('Status updated successfully');
      onClose(); // Close modal after updating
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{application.schemename}</h2>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Category:</strong> {application.category}</p>

        <h3>Documents</h3>
        <ul>
          {application.documents.map(doc => (
            <li key={doc.document_name}>
              <p>{doc.document_name}</p>
              <img
                src={`http://localhost:5000/api/schemes/${application._id}/documents/${doc.document_name}`}
                alt={doc.document_name}
                style={{ width: '200px', height: 'auto' }}
              />
            </li>
          ))}
        </ul>

        <h3>Update Status</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="reverted">Reverted</option>
        </select>
        <button className="update-button" onClick={handleUpdateStatus}>Update Status</button>
      </div>
    </div>
  );
};

export default Modal;

