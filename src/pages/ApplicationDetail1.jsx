// import React from 'react';
// import './ApplicationDetail.css'; // Add your styles here

// const ApplicationDetail = ({ scheme, onClose, onStatusChange }) => {
//   return (
//     <div className="scheme-detail-modal">
//       <div className="scheme-detail-content">
//         <h2>{scheme.schemename}</h2>
//         <p>Category: {scheme.category}</p>
//         <p>Email: {scheme.email}</p>
//         <p>Status: {scheme.status}</p>
//         <h3>Documents</h3>
//         <ul>
//           {scheme.documents.map((doc, index) => (
//             <li key={index}>
//               <p>{doc.document_name}</p>
//               <img
//                 src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
//                 alt={doc.document_name}
//                 className="scheme-document-image"
//               />
//             </li>
//           ))}
//         </ul>
//         <div className="action-buttons">
//           {scheme.status === 'Pending' && (
//             <>
//               <button className="approve-button" onClick={() => onStatusChange(scheme._id, 'Approved')}>Approve</button>
//               <button className="reject-button" onClick={() => onStatusChange(scheme._id, 'Rejected')}>Reject</button>
//               <button className="revert-button" onClick={() => onStatusChange(scheme._id, 'Reverted')}>Revert</button>
//             </>
//           )}
//           <button className="close-button" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationDetail;

