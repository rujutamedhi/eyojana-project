import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend); // Register Chart.js components

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistics');
        const { categories } = response.data;

        const labels = Object.keys(categories); // e.g., ['Category1', 'Category2']
        const data = Object.values(categories); // e.g., [10, 15]

        // Set up data for the Pie chart
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Schemes by Category',
              data: data,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <div>
          <h2>Schemes by Category</h2>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
