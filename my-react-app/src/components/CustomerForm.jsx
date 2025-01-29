import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm({ configuration, customers, setCustomers }) {
  // State to manage the form input values for a new customer
  const [customerForm, setCustomerForm] = useState({
    name: '',
    retrievalRate: 0,
    retrievalInterval: 0
  });

  // Function to handle the form submission to add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Check if configuration is set for customer retrieval rate
      if (!configuration.customerRetrievalRate) {
        alert('Please set configuration first!');
        return;
      }

      
      if (customerForm.retrievalRate > configuration.customerRetrievalRate) {
        alert(`Customer retrieval rate must be lower than ${configuration.customerRetrievalRate}`);
        return; 
      }

      // Send a POST request to the server to add a new customer with the form data
      const response = await axios.post('http://localhost:8080/api/customers', customerForm);
      
      // Update the customers state to include the newly added customer
      setCustomers([...customers, response.data]);

      // Reset the form after successful submission
      setCustomerForm({ name: '', retrievalRate: 0, retrievalInterval: 0 });
    } catch (error) {
      // Handle errors from the API call (e.g., server issues)
      console.error('Customer addition failed', error);
      alert('Failed to add customer');
    }
  };

  return (
    <div className="customer-form">
      <h2>Add Customer</h2>
      <form onSubmit={handleAddCustomer}>
        {/* Customer Name Input */}
        <div className="input-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={customerForm.name} 
            onChange={(e) => 
              
              setCustomerForm({
                ...customerForm, 
                name: e.target.value
              })
            }
            required
          />
        </div>

        {/* Ticket Retrieval Rate Input */}
        <div className="input-group">
          <label>Ticket Retrieval Rate</label>
          <input
            type="number"
            value={customerForm.retrievalRate} 
            onChange={(e) => 
              setCustomerForm({
                ...customerForm, 
                retrievalRate: parseInt(e.target.value) 
              })
            }
            max={configuration.customerRetrievalRate} 
            min="1" 
            required 
          />
        </div>

        {/* Retrieval Interval Input */}
        <div className="input-group">
          <label>Retrieval Interval</label>
          <input
            type="number"
            value={customerForm.retrievalInterval} 
            onChange={(e) => 
              setCustomerForm({
                ...customerForm, 
                retrievalInterval: parseInt(e.target.value) 
              })
            }
            min="1" 
            required 
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default CustomerForm;
