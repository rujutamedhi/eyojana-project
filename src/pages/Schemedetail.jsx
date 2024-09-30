import React from 'react';
import { useLocation } from 'react-router-dom';

const SchemeDetail = () => {
  const location = useLocation();

  // Ensure state is passed correctly
  const { selectedItem } = location.state || {};  
console.log(selectedItem)
  return (
    <div className="container mt-4">
      
      {selectedItem ? (
        <div>
          <h2> {selectedItem}</h2>
        </div>
      ) : (
        <p>No scheme selected.</p>
      )}
      
      
    </div>
  );
}

export default SchemeDetail;
