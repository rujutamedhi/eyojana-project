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
        }
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
                            <h3>{scheme.schemename}</h3>
                            <p>Status: <span className={`status-${scheme.status.toLowerCase()}`}>{scheme.status}</span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No schemes found.</p>
            )}
        </div>
    );
};

export default UserSchemes;


