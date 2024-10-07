import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css'; // For styling

const Modal = ({ application, onClose }) => {
  const [status, setStatus] = useState(application.status);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [showRevertMessage, setShowRevertMessage] = useState(false); // Track if reverted is selected
  const [revertMessage, setRevertMessage] = useState(''); // Message for reverted status

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
      const data = { status };

      // Add revert message if status is "Reverted"
      if (status === 'reverted') {
        data.revertMessage = revertMessage; 
      }

      await axios.patch(
        `http://localhost:5000/api/schemes/update-status/${application.email}/${application.schemename}`,
        data
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

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setShowRevertMessage(newStatus === 'reverted'); // Show message field if "Reverted" is selected
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content1">
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
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="reverted">Reverted</option>
        </select>

        {/* Show text field when "Reverted" is selected */}
        {showRevertMessage && (
          <div className="revert-message">
            <h4>Reason for Reversion:</h4>
            <textarea
              value={revertMessage}
              onChange={(e) => setRevertMessage(e.target.value)}
              placeholder="Enter the reason for reversion..."
              rows={4}
              style={{ width: '100%' }}
            />
          </div>
        )}

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
