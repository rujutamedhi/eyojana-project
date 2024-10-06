import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { Link, useNavigate } from 'react-router-dom';
import "./schemedetails.css"
const SchemeDetail = () => {
  const location = useLocation();
  const { selectedItem } = location.state || {};

  const [csvData, setCsvData] = useState([]);
  const [matchingScheme, setMatchingScheme] = useState(null);

  // Single path to the CSV file
  const csvFilePath = '\document.csv';  // Update with actual path

  // Parse CSV file
  useEffect(() => {
    const parseCSV = (filePath) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          // Find the matching scheme based on selectedItem
          const match = results.data.find(
            (scheme) => scheme.span_text === selectedItem
          );
          setMatchingScheme(match);
        },
        error: (error) => {
          console.error('Error loading CSV data:', error);
        },
      });
    };

    if (selectedItem) {
      parseCSV(csvFilePath);
    }
  }, [selectedItem]);

  return (
    <div className="container mt-4">
      {matchingScheme ? (
        <div>
          <h2>{matchingScheme.span_text}</h2>
          <p><strong>Document:</strong> {matchingScheme.document}</p>
          <p><strong>Details:</strong> {matchingScheme.details_text}</p>
          <p><strong>Eligibility:</strong> {matchingScheme.eligibility_text}</p>
          <p><strong>Benefits:</strong> {matchingScheme.benefit_text}</p>
           <Link className='button' to={"/schemeform"} >Apply</Link>
        </div>
      ) : (
        <p>No scheme selected or details not available.</p>
      )}
    </div>
  );
};

export default SchemeDetail;
