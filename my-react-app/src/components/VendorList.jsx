import React from 'react';

function VendorList({ vendors }) {
  return (
    <div className="vendors-list">
      <h2>Vendors</h2>
      {/* Map through the 'vendors' array and render each vendor's information */}
      {vendors.map((vendor) => (
        <div key={vendor.id} className="card">
          {/* Display vendor name */}
          <h3>{vendor.name}</h3>
          {/* Display vendor release rate */}
          <p>Release Rate: {vendor.releaseRate}</p>
          {/* Display vendor release interval */}
          <p>Release Interval: {vendor.releaseInterval}</p>
        </div>
      ))}
    </div>
  );
}

export default VendorList;
