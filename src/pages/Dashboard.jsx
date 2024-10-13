import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts';
import './Dashboard.css'; // Import the CSS

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [schemeData, setSchemeData] = useState([]); // Full scheme data for charts
  const [filteredSchemeData, setFilteredSchemeData] = useState([]); // Store filtered scheme data for charts
  const [filteredSchemeNames, setFilteredSchemeNames] = useState([]); // Store filtered scheme names
  const [users, setUsers] = useState([]); // State to hold users
  const [selectedUser, setSelectedUser] = useState(''); // State for selected user
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status
  const [showFilteredSchemes, setShowFilteredSchemes] = useState(false); // State to manage visibility of filtered schemes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/api/statistics/users/count');
        setUserCount(userResponse.data.userCount);

        // Fetch schemes without filtering
        const schemeResponse = await axios.get('http://localhost:5000/api/statistics/schemes/count');
        setSchemeData(schemeResponse.data); // Store all scheme data for charts

        // Fetch users for filtering
        const usersResponse = await axios.get('http://localhost:5000/api/statistics/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle filtering
  const handleFilterChange = async () => {
    try {
      // Prepare parameters for filtering
      const params = {};
      if (selectedUser) {
        params.user_id = selectedUser; // Correct parameter name
      }
      if (selectedStatus) {
        params.status = selectedStatus; // Set status if a status is selected
      }

      // Fetch filtered scheme names
      const response = await axios.get('http://localhost:5000/api/statistics/filterscheme', { params });
      setFilteredSchemeNames(response.data.map(scheme => scheme.schemeName)); // Store only names

      // Store filtered scheme data for charts
      setFilteredSchemeData(response.data); // Update with filtered data for charts

      // Show filtered schemes after fetching
      setShowFilteredSchemes(true);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  // Use effect to update filtered scheme names whenever user or status changes
  useEffect(() => {
    if (selectedUser || selectedStatus) {
      handleFilterChange(); // Automatically fetch names when filters change
    } else {
      setFilteredSchemeNames([]); // Reset if no filter is applied
      setFilteredSchemeData([]); // Reset filtered scheme data
      setShowFilteredSchemes(false); // Hide filtered schemes if no filter
    }
  }, [selectedUser, selectedStatus]);

  return (
    <div className="dashboard-container">
      <h1>Social Media Users and Scheme Data</h1>
      <h2>Total Users: {userCount}</h2>

      {/* Flex container to align charts side by side */}
      <div className="chart-container">
        {/* Pie Chart */}
        <div className="pie-chart">
          <PieChart width={500} height={400}>
            <Pie
              dataKey="appliedUsers"
              isAnimationActive={false}
              data={filteredSchemeData.length > 0 ? filteredSchemeData : schemeData} // Use filtered data if available, otherwise use full data
              cx={250} // Centering the pie chart
              cy={200} // Centering the pie chart
              outerRadius={80}
              fill="#8884d8" // Default color for the pie chart
              label={({ payload }) => payload.schemeName || payload._id} // Display scheme names on hover
            />
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bar-chart">
          <BarChart
            width={600} // Increased width
            height={400} // Increased height
            data={schemeData} // Use full scheme data
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="_id" /> {/* Use scheme name instead of schemeName */}
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="appliedUsers" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option> // Display username in the dropdown
          ))}
        </select>

        <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
          <option value="">Select Status</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
          <option value="reverted">Reverted</option>
          <option value="approved">Approved</option>
        </select>

        <button onClick={handleFilterChange}>Filter</button>
      </div>

      {/* Display filtered scheme names only if showFilteredSchemes is true */}
      {showFilteredSchemes && (
        <div className="filtered-scheme-names">
          <h3>Filtered Scheme Names:</h3>
          <div className="scheme-cards">
            {filteredSchemeNames.length > 0 ? (
              filteredSchemeNames.map((schemeName, index) => (
                <div key={index} className="scheme-card">
                  {schemeName} {/* Display scheme name */}
                </div>
              ))
            ) : (
              <p>No schemes found for the selected filters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
