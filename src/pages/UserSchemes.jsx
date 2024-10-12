import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import "./UserSchemes.css";

const UserSchemes = () => {
    const { isLoggedIn, email } = useAuth(); 
    const [schemes, setSchemes] = useState([]);
    const [filteredSchemes, setFilteredSchemes] = useState([]);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const navigate = useNavigate(); 

  
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchSchemes = async () => {
            if (email) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/schemes/${email}`);
                    setSchemes(response.data);
                    setFilteredSchemes(response.data); // Initialize filtered schemes
                } catch (error) {
                    console.error('Error fetching schemes:', error);
                    setError('Could not fetch schemes. Please try again later.');
                }
            }
        };

        fetchSchemes();
    }, [email]);

    // Filter schemes based on selected status
    const handleFilterChange = (status) => {
        setStatusFilter(status);
        if (status === 'All') {
            setFilteredSchemes(schemes);
        } else {
            const filtered = schemes.filter(scheme => scheme.status.trim().toLowerCase() === status.toLowerCase());
            console.log(`Filtering for status: ${status}, Found:`, filtered); 
            setFilteredSchemes(filtered);
            setShowButton(false);
        }
    };

    // const handleButtonClick = async (schemeId) => {
    //     console.log('Scheme ID being passed:', schemeId); // Add this to log the ID
    //     try {
    //         const response = await axios.get(`http://localhost:3000/api/schemes/${schemeId}`);
    //         console.log('Scheme data:', response.data); // Log the scheme data to ensure it's fetched correctly
    //         setFormData(response.data); 
    //         setIsFormOpen(true); 
    //     } catch (error) {
    //         console.error('Error fetching form data:', error);
    //     }
    // };
    
    const handleFormSubmit = async (updatedData) => {
        try {
            // Submit the updated data to the backend
            await axios.put(`/api/schemes/${formData.id}`, updatedData);
            console.log('Form updated successfully');
            setIsFormOpen(false); // Close the form modal
        } catch (error) {
            console.error('Error updating form:', error);
        }
    };

    // const handleEdit = async (schemeId) => {
    //     try {
    //       const response = await axios.get(`http://localhost:5000/api/schemes/${schemeId}`);
    //       const schemeData = response.data;
    //       navigate("/edit-form", { state: { schemeData } });
    //     } catch (err) {
    //       console.error("Error fetching scheme data:", err);
    //     }
    //   };

    const handleEditClick = (schemeName, user_id, documents, _id) => {
        // Passing all documents along with the other necessary data
        navigate('/schemeform', { state: { schemeName, user_id, documents, _id ,docName} });
        console.log(documents)
    };

    const [selectedDoc, setSelectedDoc] = useState(null); // Track selected document for modal view

    const handleDocumentClick = (docName, schemeId) => {
        setSelectedDoc({ docName, schemeId }); // Set the selected document with schemeId
    };

    const closeDocumentViewer = () => {
        setSelectedDoc(null); // Close document viewer
    };
    
    return (
        <div className="user-schemes-container">
            <h2>Your Applied Schemes</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="filter-buttons">
                <button onClick={() => handleFilterChange('All')}>All</button>
                <button onClick={() => handleFilterChange('Approved')}>Approved</button>
                <button onClick={() => handleFilterChange('Pending')}>Pending</button>
                <button onClick={() => handleFilterChange('Rejected')}>Rejected</button>
            </div>
            {filteredSchemes.length > 0 ? (
                <div className="schemes-grid">
                    {filteredSchemes.map((scheme) => (
                        <div key={scheme._id} className="scheme-card">
                            <div className="schemenm">
                                <h4>{scheme.schemename}</h4>
                            </div>
                            <div>
                                <p>Status: <span className={`status-${scheme.status.toLowerCase()}`}>{scheme.status}</span></p>

                                {/* Display documents */}
                                <h5>Documents</h5>
                                <ul>
                                    {scheme.documents.map(doc => (
                                        <li key={doc.document_name}>
                                            <p>{doc.document_name}</p>
                                            <img
                                                src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
                                                alt={doc.document_name}
                                                style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                                onClick={() => handleDocumentClick(doc.document_name, scheme._id)}
                                            />
                                        </li>
                                    ))}
                                </ul>

                                {/* Edit Button */}
                                {scheme.status.trim().toLowerCase() === 'reverted' && (
    <button onClick={() => handleEditClick(scheme.schemename, scheme.user_id, doc.document_name, scheme.documents, scheme._id)}>
        Edit
    </button> 
)}

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No schemes found.</p>
            )}

            {/* Document Viewer Modal */}
            {selectedDoc && (
                <div className="document-viewer-overlay" onClick={closeDocumentViewer}>
                    <div className="document-viewer-content" onClick={e => e.stopPropagation()}>
                        <h3>{selectedDoc.docName}</h3>
                        <img
                            src={`http://localhost:5000/api/schemes/${selectedDoc.schemeId}/documents/${selectedDoc.docName}`}
                            alt={selectedDoc.docName}
                            style={{ maxWidth: '90%', maxHeight: '90%' }}
                        />
                        <button className="close-button" onClick={closeDocumentViewer}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default UserSchemes;


