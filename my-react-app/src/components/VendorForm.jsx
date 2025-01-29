import React, { useState } from 'react';
import axios from 'axios';

function VendorForm({ configuration, vendors, setVendors }) {
  // State to manage the vendor form data
  const [vendorForm, setVendorForm] = useState({
    name: '',
    releaseRate: 0,
    releaseInterval: 0
  });

  // Function to handle the form submission and add a vendor
  const handleAddVendor = async (e) => {
    e.preventDefault(); 

    try {
     
      if (!configuration.ticketReleaseRate) {
        alert('Please set configuration first!');
        return; 
      }

      
      if (vendorForm.releaseRate > configuration.ticketReleaseRate) {
        alert(`Vendor release rate must be lower than ${configuration.ticketReleaseRate}`);
        return; 
      }

      // Send the vendor data to the server to be added to the database
      const response = await axios.post('http://localhost:8080/api/vendors', vendorForm);
      
      // Update the vendors state with the newly added vendor
      setVendors([...vendors, response.data]);
      
      // Reset the form after successful submission
      setVendorForm({ name: '', releaseRate: 0, releaseInterval: 0 });
    } catch (error) {
      
      console.error('Vendor addition failed', error);
      alert('Failed to add vendor');
    }
  };

  return (
    <div className="vendor-form">
      <h2>Add Vendor</h2>
      <form onSubmit={handleAddVendor}>
        {/* Vendor Name input */}
        <div className="input-group">
          <label>Vendor Name</label>
          <input
            type="text"
            value={vendorForm.name}
            onChange={(e) => setVendorForm({
              ...vendorForm,
              name: e.target.value
            })}
            required
          />
        </div>

        {/* Ticket Release Rate input */}
        <div className="input-group">
          <label>Ticket Release Rate</label>
          <input
            type="number"
            value={vendorForm.releaseRate}
            onChange={(e) => setVendorForm({
              ...vendorForm,
              releaseRate: parseInt(e.target.value) 
            })}
            min="1"
            max={configuration.ticketReleaseRate}
            required
          />
        </div>

        {/* Release Interval input */}
        <div className="input-group">
          <label>Release Interval</label>
          <input
            type="number"
            value={vendorForm.releaseInterval}
            onChange={(e) => setVendorForm({
              ...vendorForm,
              releaseInterval: parseInt(e.target.value)
            })}
            min="1" 
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">Add Vendor</button>
      </form>
    </div>
  );
}

export default VendorForm;
