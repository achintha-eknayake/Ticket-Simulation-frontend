import React from 'react';

function CustomerList({ customers }) {
  return (
    <div className="customers-list">
      <h2>Customers</h2>
      {/* Map through the 'customers' array and render each customer's details */}
      {customers.map((customer) => (
        <div key={customer.id} className="card">
          {/* Display customer name */}
          <h3>{customer.name}</h3>
          {/* Display customer retrieval rate */}
          <p>Retrieval Rate: {customer.retrievalRate}</p>
          {/* Display customer retrieval interval */}
          <p>Retrieval Interval: {customer.retrievalInterval}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
