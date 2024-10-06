import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css'; // For styling

const Modal = ({ application, onClose }) => {
  const [status, setStatus] = useState(application.status);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  // Fetch user details based on the application email when modal opens
  useEffect(() => {
    const fetchUserDetails = async (email) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/email`, {
          params: { email }, // Pass email as query parameter
        });
        console.log('User details:', response.data);
        setUserDetails(response.data); // Update state with user details
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (application.email) { // Ensure application has an email
      fetchUserDetails(application.email); // Pass the email of the application
    }
  }, [application.email]);

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/schemes/update-status/${application.email}/${application.schemename}`,
        { status }
      );
      alert('Status updated successfully');
      onClose(); // Close modal after updating
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDocumentClick = (docName) => {
    setSelectedDoc(docName); // Set the clicked document name
  };

  const closeDocumentViewer = () => {
    setSelectedDoc(null); // Close the document viewer
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{application.schemename}</h2>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Category:</strong> {application.category}</p>

        {/* Displaying user details */}
        {userDetails && (
          <>
            <h3>User Details:</h3>
            <p><strong>Name:</strong> {userDetails.username}</p> {/* Assuming username instead of name */}
            <p><strong>State:</strong> {userDetails.state}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
          </>
        )}

        <h3>Documents</h3>
        <ul>
          {application.documents.map(doc => (
            <li key={doc.document_name}>
              <p>{doc.document_name}</p>
              <img
                src={`http://localhost:5000/api/schemes/${application._id}/documents/${doc.document_name}`}
                alt={doc.document_name}
                style={{ width: '200px', height: 'auto', cursor: 'pointer' }}
                onClick={() => handleDocumentClick(doc.document_name)} 
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

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div className="document-viewer-overlay" onClick={closeDocumentViewer}>
          <div className="document-viewer-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedDoc}</h3>
            <img
              src={`http://localhost:5000/api/schemes/${application._id}/documents/${selectedDoc}`}
              alt={selectedDoc}
              style={{ maxWidth: '90%', maxHeight: '90%' }}
            />
            <button className="close-button" onClick={closeDocumentViewer}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
