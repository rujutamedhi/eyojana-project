import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; 
import './AppliedSchemes.css'; // Import the CSS file for styling

const Applications = () => {
  const [applications, setApplications] = useState({ pending: [], approved: [], rejected: [], reverted: [] });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        const categorized = {
          pending: response.data.filter(app => app.status === 'pending'),
          approved: response.data.filter(app => app.status === 'approved'),
          rejected: response.data.filter(app => app.status === 'rejected'),
          reverted: response.data.filter(app => app.status === 'reverted'),
        };
        setApplications(categorized);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setShowModal(false);
  };

  return (
    <div className="applications-container">
      <h1>All Applications</h1>
      {['pending', 'approved', 'rejected', 'reverted'].map(status => (
        <div key={status} className="application-category">
          <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Applications</h2>
          <div className="applications-grid">
            {applications[status].length > 0 ? (
              applications[status].map(app => (
                <div key={app._id} className="application-card">
                  <h3>{app.schemename}</h3>
                  <p>Status: {app.status}</p>
                  <p>Category: {app.category}</p>
                  <p>Email: {app.email}</p>
                  <button onClick={() => handleViewDetails(app)}>View Details</button>
                </div>
              ))
            ) : (
              <p>No {status} applications found.</p>
            )}
          </div>
        </div>
      ))}
      {showModal && selectedApplication && (
        <Modal application={selectedApplication} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Applications;
