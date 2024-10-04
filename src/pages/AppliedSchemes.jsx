import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppliedSchemes.css'

const AppliedSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes'); // Make sure the URL is correct
        setSchemes(response.data); // Update state with the fetched schemes
      } catch (error) {
        console.error('Error fetching schemes:', error);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div>
      <h1>Applied Schemes</h1>
      {schemes.length > 0 ? (
        schemes.map((scheme) => (
          <div key={scheme._id}>
            <h2>{scheme.schemename}</h2>
            <p>Status: {scheme.status}</p>
            <p>Category: {scheme.category}</p>
            <p>Email: {scheme.email}</p>
            <ul>
              {scheme.documents.map((doc, index) => (
                <li key={index}>
                  <p>{doc.document_name}</p>
                  <img
                    src={`http://localhost:5000/api/schemes/${scheme._id}/documents/${doc.document_name}`}
                    alt={doc.document_name}
                    style={{ width: '200px', height: 'auto' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No schemes found</p>
      )}
    </div>
  );
};

export default AppliedSchemes;
