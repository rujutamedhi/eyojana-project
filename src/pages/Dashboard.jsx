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
  const [schemeData, setSchemeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/api/statistics/users/count');
        setUserCount(userResponse.data.userCount);

        const schemeResponse = await axios.get('http://localhost:5000/api/statistics/schemes/count');
        setSchemeData(schemeResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Social Media Users and Scheme Data</h1>
      <h2>Total Users: {userCount}</h2>

      {/* Flex container to align charts side by side */}
      <div className="chart-container">
        {/* Pie Chart */}
        <div className="pie-chart">
          <PieChart width={500} height={400}> {/* Increased size */}
            <Pie
              dataKey="appliedUsers"
              isAnimationActive={false}
              data={schemeData}
              cx={250} // Centering the pie chart
              cy={200} // Centering the pie chart
              outerRadius={80}
              fill="#8884d8" // Default color for the pie chart
              label={(entry) => entry._id}
            />
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bar-chart">
          <BarChart
            width={600} // Increased width
            height={400} // Increased height
            data={schemeData}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="appliedUsers" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
