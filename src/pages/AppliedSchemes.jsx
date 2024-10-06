// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './AppliedSchemes.css';

// // const AppliedSchemes = () => {
// //   const [schemes, setSchemes] = useState([]);
// //   const [groupedSchemes, setGroupedSchemes] = useState({});

// //   useEffect(() => {
// //     const fetchSchemes = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/schemes'); 
// //         setSchemes(response.data); 

// //         // Group schemes by status
// //         const grouped = response.data.reduce((acc, scheme) => {
// //           if (!acc[scheme.status]) {
// //             acc[scheme.status] = [];
// //           }
// //           acc[scheme.status].push(scheme);
// //           return acc;
// //         }, {});

// //         setGroupedSchemes(grouped); 
// //       } catch (error) {
// //         console.error('Error fetching schemes:', error);
// //       }
// //     };

// //     fetchSchemes();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>All Schemes</h1>
// //       {Object.keys(groupedSchemes).length > 0 ? (
// //         Object.entries(groupedSchemes).map(([status, schemes]) => (
// //           <div key={status}>
// //             <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Schemes</h2> 
// //             {schemes.map((scheme) => (
// //               <div key={scheme._id}>
// //                 <h3>{scheme.schemename}</h3>
// //                 <p>Category: {scheme.category}</p>
// //                 <p>Email: {scheme.email}</p>
// //                 <ul>
// //                   {scheme.documents.map((doc, index) => (
// //                     <li key={index}>
// //                       <p>{doc.document_name}</p>
// //                       <img
// //                         src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
// //                         alt={doc.document_name}
// //                         style={{ width: '100px', height: 'auto' }}
// //                       />
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         ))
// //       ) : (
// //         <p>No schemes found</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default AppliedSchemes;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AppliedSchemes.css';

// const AppliedSchemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [groupedSchemes, setGroupedSchemes] = useState({});

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
      
//       // Update local state to reflect changes
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
//     } catch (error) {
//       console.error('Error updating scheme status:', error);
//       alert('Failed to update scheme status.');
//     }
//   };

//   return (
//     <div>
//       <h1>Applied Schemes</h1>
//       {Object.keys(groupedSchemes).length > 0 ? (
//         Object.entries(groupedSchemes).map(([status, schemes]) => (
//           <div key={status}>
//             <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Schemes</h2>
//             {schemes.map((scheme) => (
//               <div key={scheme._id}>
//                 <h3>{scheme.schemename}</h3>
//                 <p>Category: {scheme.category}</p>
//                 <p>Email: {scheme.email}</p>
//                 <p>Status: {scheme.status}</p>
//                 <ul>
//                   {scheme.documents.map((doc, index) => (
//                     <li key={index}>
//                       <p>{doc.document_name}</p>
//                       <img
//                         src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
//                         alt={doc.document_name}
//                         style={{ width: '200px', height: 'auto' }}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//                 {scheme.status === 'Pending' && (
//                   <div>
//                     <button onClick={() => handleStatusChange(scheme._id, 'Approved')}>Approve</button>
//                     <button onClick={() => handleStatusChange(scheme._id, 'Rejected')}>Reject</button>
//                     <button onClick={() => handleStatusChange(scheme._id, 'Reverted')}>Revert</button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>No schemes found</p>
//       )}
//     </div>
//   );
// };

// export default AppliedSchemes;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppliedSchemes.css'; // Assuming styles are defined here

const AppliedSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [groupedSchemes, setGroupedSchemes] = useState({});

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(response.data);

        const grouped = response.data.reduce((acc, scheme) => {
          if (!acc[scheme.status]) {
            acc[scheme.status] = [];
          }
          acc[scheme.status].push(scheme);
          return acc;
        }, {});

        setGroupedSchemes(grouped);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };

    fetchSchemes();
  }, []);

  const handleStatusChange = async (schemeId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/schemes/${schemeId}`, { status: newStatus });
      alert(`Scheme status updated to ${newStatus}`);

      setGroupedSchemes(prev => {
        const updatedGrouped = { ...prev };
        Object.keys(updatedGrouped).forEach(status => {
          updatedGrouped[status] = updatedGrouped[status].filter(scheme => scheme._id !== schemeId);
        });
        if (!updatedGrouped[newStatus]) {
          updatedGrouped[newStatus] = [];
        }
        updatedGrouped[newStatus].push(response.data);
        return updatedGrouped;
      });
    } catch (error) {
      console.error('Error updating scheme status:', error);
      alert('Failed to update scheme status.');
    }
  };

  return (
    <div className="applied-schemes-container">
      <h1>Applied Schemes</h1>
      {Object.keys(groupedSchemes).length > 0 ? (
        Object.entries(groupedSchemes).map(([status, schemes]) => (
          <div className="scheme-category" key={status}>
            <h2>{status.charAt(0).toUpperCase() + status.slice(1)} Schemes</h2>
            <div className="scheme-cards">
              {schemes.map((scheme) => (
                <div className="scheme-card" key={scheme._id}>
                  <h3>{scheme.schemename}</h3>
                  <p>Category: {scheme.category}</p>
                  <p>Email: {scheme.email}</p>
                  <p>Status: {scheme.status}</p>
                  <ul>
                    {scheme.documents.map((doc, index) => (
                      <li key={index}>
                        <p>{doc.document_name}</p>
                        <img
                          src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
                          alt={doc.document_name}
                          className="scheme-document-image"
                        />
                      </li>
                    ))}
                  </ul>
                  {scheme.status === 'Pending' && (
                    <div className="action-buttons">
                      <button className="approve-button" onClick={() => handleStatusChange(scheme._id, 'Approved')}>Approve</button>
                      <button className="reject-button" onClick={() => handleStatusChange(scheme._id, 'Rejected')}>Reject</button>
                      <button className="revert-button" onClick={() => handleStatusChange(scheme._id, 'Reverted')}>Revert</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No schemes found</p>
      )}
    </div>
  );
};

export default AppliedSchemes;

