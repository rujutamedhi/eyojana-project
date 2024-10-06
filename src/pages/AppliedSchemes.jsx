// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ApplicationDetail from './ApplicationDetail1'; // Import the detail view component
// import './AppliedSchemes.css';

// const AppliedSchemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [groupedSchemes, setGroupedSchemes] = useState({});
//   const [selectedScheme, setSelectedScheme] = useState(null); // Track selected scheme

//   useEffect(() => {
//     const fetchSchemes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/schemes');
//         setSchemes(response.data);

//         const grouped = response.data.reduce((acc, scheme) => {
//           if (!acc[scheme.status]) {
//             acc[scheme.status] = [];
//           }
//           acc[scheme.status].push(scheme);
//           return acc;
//         }, {});

//         setGroupedSchemes(grouped);
//       } catch (error) {
//         console.error('Error fetching schemes:', error);
//       }
//     };

//     fetchSchemes();
//   }, []);

//   const handleStatusChange = async (schemeId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/schemes/${schemeId}`, { status: newStatus });
//       alert(`Scheme status updated to ${newStatus}`);

//       setGroupedSchemes(prev => {
//         const updatedGrouped = { ...prev };
//         Object.keys(updatedGrouped).forEach(status => {
//           updatedGrouped[status] = updatedGrouped[status].filter(scheme => scheme._id !== schemeId);
//         });
//         if (!updatedGrouped[newStatus]) {
//           updatedGrouped[newStatus] = [];
//         }
//         updatedGrouped[newStatus].push(response.data);
//         return updatedGrouped;
//       });
//       setSelectedScheme(null); // Close detail view after updating status
//     } catch (error) {
//       console.error('Error updating scheme status:', error);
//       alert('Failed to update scheme status.');
//     }
//   };

//   return (
//     <div className="applied-schemes-container">
//       <h1>Applied Schemes</h1>
//       {Object.keys(groupedSchemes).length > 0 ? (
//         Object.entries(groupedSchemes).map(([status, schemes]) => (
//           <div className="scheme-category" key={status}>
//             <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Schemes</h2>
//             <div className="scheme-cards">
//               {schemes.map((scheme) => (
//                 <div className="scheme-card" key={scheme._id}>
//                   <h3>{scheme.schemename}</h3>
//                   <p>Category: {scheme.category}</p>
//                   <p>Email: {scheme.email}</p>
//                   <p>Status: {scheme.status}</p>
//                   <button onClick={() => setSelectedScheme(scheme)}>View Details</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No schemes found</p>
//       )}

//       {selectedScheme && (
//         <ApplicationDetail 
//           scheme={selectedScheme} 
//           onClose={() => setSelectedScheme(null)} 
//           onStatusChange={handleStatusChange} 
//         />
//       )}
//     </div>
//   );
// };

// export default AppliedSchemes;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Applications.css'; // Assuming you will style it
import Modal from './Modal'; // Assuming a Modal component

const Applications = () => {
  const [applications, setApplications] = useState({ pending: [], approved: [], rejected: [] });
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
      <h1>Applications</h1>
      {['pending', 'approved', 'rejected'].map(status => (
        <div key={status}>
          <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Applications</h2>
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
      ))}
      {showModal && selectedApplication && (
        <Modal application={selectedApplication} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Applications;
