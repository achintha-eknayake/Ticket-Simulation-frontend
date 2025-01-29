import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import components
import ConfigurationForm from './components/ConfigurationForm';
import VendorForm from './components/VendorForm';
import CustomerForm from './components/CustomerForm';
import ThreadControlButtons from './components/ThreadControlButtons';
import ResetButton from './components/ResetButton';
import VendorList from './components/VendorList';
import CustomerList from './components/CustomerList';
import TicketPoolDashboard from './components/TicketPoolDashboard';

function App() {
  // State Management for Configuration
  // This state holds the configuration data for the simulation.
  const [configuration, setConfiguration] = useState({
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0
  });

  // State for Vendors and Customers
  // These states store the list of vendors and customers fetched from the server.
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch Initial Data on Component Mount
  useEffect(() => {
    // Define an asynchronous function to fetch initial configuration, vendor, and customer data
    const fetchInitialData = async () => {
      try {
        // Fetch configuration data from the backend API
        const configResponse = await axios.get('http://localhost:8080/api/configuration');
        if (configResponse.data) {
          setConfiguration(configResponse.data);
        }

        // Fetch vendor data from the backend API
        const vendorsResponse = await axios.get('http://localhost:8080/api/vendors');

        // Fetch customer data from the backend API
        const customersResponse = await axios.get('http://localhost:8080/api/customers');

        // Update state with the fetched data
        setVendors(vendorsResponse.data);
        setCustomers(customersResponse.data);
      } catch (error) {
        // Log an error if the fetch operation fails
        console.error('Initial data fetch failed', error);
      }
    };

    // Trigger the data fetch when the component mounts
    fetchInitialData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="container">
      <header>
        <h1>Real-time Ticket Simulation</h1>
      </header>

      {/* Configuration Section */}
      <ConfigurationForm 
        configuration={configuration} 
        setConfiguration={setConfiguration} 
      />

      {/* Simulation Management Section */}
      <section className="simulation-section">
        <div className="add-detail">
          {/* Vendor Addition Form */}
          <VendorForm 
            configuration={configuration}
            vendors={vendors}
            setVendors={setVendors}
          />

          {/* Customer Addition Form */}
          <CustomerForm 
            configuration={configuration}
            customers={customers}
            setCustomers={setCustomers}
          />

          {/* Thread Control Buttons */}
          <div className="thread-control">
            <h2>Thread Control</h2>
            <ThreadControlButtons />

            {/* Reset Button */}
            <div>
              <ResetButton/>
            </div>
          </div>
        </div>

        {/* Right Panel: Vendor and Customer Lists */}
        <div className="view-detail">
          <VendorList vendors={vendors} />
          <CustomerList customers={customers} />
        </div>
      </section>

      {/* Ticket Availability Dashboard */}
      <section className="ticket-availability">
        <div className="real-time-dashboard">
          <h2>Real-Time Ticket Availability</h2>
          <TicketPoolDashboard/>
        </div>
      </section>
    </div>
  );
}

export default App;