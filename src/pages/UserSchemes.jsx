import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 
import "./UserSchemes.css";

const UserSchemes = () => {
  const { email } = useAuth(); 
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      if (email) { 
        try {
          const response = await axios.get(`http://localhost:5000/api/schemes/${email}`);
          setSchemes(response.data); 
        } catch (error) {
          console.error('Error fetching schemes:', error);
          setError('Could not fetch schemes. Please try again later.'); 
        }
      }
    };

    fetchSchemes(); 
  }, [email]);

  return (
    <div>
      <h2>Your Applied Schemes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {schemes.length > 0 ? (
        <ul>
          {schemes.map((scheme) => (
            <li key={scheme._id}>{scheme.schemename} - Status: {scheme.status}</li>
          ))}
        </ul>
      ) : (
        <p>No schemes found.</p>
      )}
    </div>
  );
};

export default UserSchemes;
