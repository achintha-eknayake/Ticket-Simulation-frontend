import React from 'react';
import axios from 'axios';

function ConfigurationForm({ configuration, setConfiguration }) {
  // Function to handle form submission for setting the configuration
  const handleConfigSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      
      if (
        configuration.totalTickets <= 0 || 
        configuration.ticketReleaseRate <= 0 || 
        configuration.customerRetrievalRate <= 0 || 
        configuration.maxTicketCapacity <= 0
      ) {
        
        alert('Please fill all configuration fields with positive values');
        return; 
      }

      // API call to update the configuration on the server
      const response = await axios.put('http://localhost:8080/api/configuration', configuration);
      
      // Update the state with the new configuration returned by the server
      setConfiguration(response.data);

      
      alert('Configuration set successfully!');
    } catch (error) {
      // Handle errors from the API call or network issues
      console.error('Configuration submission failed', error);

     
      alert('Failed to set configuration. Please check your inputs.');
    }
  };

  return (
    <section className="configuration-section">
      <h2>Simulation Configuration</h2>
      <form onSubmit={handleConfigSubmit}>
        {/* Input for Total Available Tickets */}
        <div className="input-group">
          <label>Total Available Tickets</label>
          <input 
            type="number" 
            value={configuration.totalTickets} 
            onChange={(e) => 
              // Update configuration state on input change
              setConfiguration({
                ...configuration, 
                totalTickets: parseInt(e.target.value)
              })
            }
            min="0" 
            max={configuration.maxTicketCapacity} 
            required 
          />
        </div>

        {/* Input for Maximum Vendor Release Rate */}
        <div className="input-group">
          <label>Maximum Vendor Release Rate</label>
          <input 
            type="number" 
            value={configuration.ticketReleaseRate} 
            onChange={(e) => 
              setConfiguration({
                ...configuration, 
                ticketReleaseRate: parseInt(e.target.value) 
              })
            }
            min="0"
            required 
          />
        </div>

        {/* Input for Maximum Customer Retrieval Rate */}
        <div className="input-group">
          <label>Maximum Customer Retrieval Rate</label>
          <input 
            type="number" 
            value={configuration.customerRetrievalRate} 
            onChange={(e) => 
              setConfiguration({
                ...configuration, 
                customerRetrievalRate: parseInt(e.target.value) 
              })
            }
            min="0" 
            required 
          />
        </div>

        {/* Input for Total Ticket Capacity */}
        <div className="input-group">
          <label>Total Ticket Capacity</label>
          <input 
            type="number" 
            value={configuration.maxTicketCapacity}
            onChange={(e) => 
              setConfiguration({
                ...configuration, 
                maxTicketCapacity: parseInt(e.target.value) 
              })
            }
            min={configuration.totalTickets}
            required
          />
        </div>

        {/* Submit button for form */}
        <button type="submit">Set Configuration</button>
      </form>
    </section>
  );
}

export default ConfigurationForm;
