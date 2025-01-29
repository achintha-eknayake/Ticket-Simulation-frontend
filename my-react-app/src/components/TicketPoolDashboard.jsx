import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import '../styles/TicketPoolDashboard.css';

const TicketPoolDashboard = () => {
  const [graphData, setGraphData] = useState([]); // State to hold graph data (ticket statistics)
  const [isRunning, setIsRunning] = useState(false); // State to control whether the graph is updating
  const [error, setError] = useState(null); // State to handle and display any errors

  useEffect(() => {
    let intervalId;

    // Function to fetch ticket pool data from the backend
    const fetchTicketPoolData = async () => {
      try {
        // Send GET request to fetch ticket pool status
        const response = await fetch('http://localhost:8080/api/ticket-pool/status');
        
        // Check if the response is okay; throw an error if not
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response from the backend
        const data = await response.json();
        
        // Create a new entry for graph data using the response
        const newEntry = {
          timestamp: new Date().toLocaleTimeString(), // Current time as a readable string
          currentTickets: data.currentTickets, // Current number of tickets
          totalCapacity: data.totalCapacity // Total ticket capacity
        };

        // Update the graph data state with the new entry, keeping only the last 30 entries
        setGraphData(prevData => {
          const updatedData = [...prevData, newEntry];
          return updatedData.slice(-30); // Limit data to the last 30 entries for display
        });

        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Fetch error:', error); // Log error to console for debugging
        setError(error.message); // Update error state to display an error message
      }
    };

    // If the graph is running, start fetching data at intervals
    if (isRunning) {
      fetchTicketPoolData(); // Fetch data immediately on start
      intervalId = setInterval(fetchTicketPoolData, 2000); // Fetch data every 2 seconds
    }

    // Cleanup function to clear the interval when the component unmounts or isRunning changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Dependency array ensures effect runs only when isRunning changes

  // Function to start or stop the graph updates and reset the graph data
  const toggleGraph = () => {
    setIsRunning(!isRunning); // Toggle the running state
    setGraphData([]); // Clear the graph data when toggling
  };

  // Extract the most recent data entry for display
  const latestData = graphData.length > 0 ? graphData[graphData.length - 1] : null;

  // If there's an error, display an error message and retry button
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">
          Error: {error} {/* Display the error message */}
        </p>
        <button onClick={toggleGraph} className="retry-button">
          Retry {/* Retry button to restart data fetching */}
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Ticket Pool Dashboard</h2>
        {latestData && (
          <div className="dashboard-info">
            <strong>Total Tickets:</strong> {latestData.currentTickets} / {latestData.totalCapacity} {/* Display the current ticket count */}
          </div>
        )}
        <button
          onClick={toggleGraph}
          className={`toggle-button ${isRunning ? 'button-stop' : 'button-start'}`}
        >
          {isRunning ? 'Stop' : 'Start'} {/* Button text changes based on isRunning */}
        </button>
      </div>

      {/* Line chart to visualize ticket data */}
      <LineChart width={600} height={300} data={graphData}>
        <XAxis
          dataKey="timestamp" // Use timestamp for the x-axis
          label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis
          domain={[0, 'dataMax']} // Y-axis scales dynamically with the data
          label={{
            value: 'Total Tickets',
            angle: -90, // Rotate label for readability
            position: 'insideLeft',
          }}
        />
        <CartesianGrid strokeDasharray="3 3" /> {/* Adds grid lines for better readability */}
        <Tooltip /> {/* Displays data values on hover */}
        <Legend /> {/* Adds a legend to differentiate the lines */}
        <Line
          type="monotone" 
          dataKey="currentTickets" // Line for current ticket count
          name="Current Tickets" 
          stroke="#8884d8" 
          strokeWidth={2} 
        />
        <Line
          type="monotone"
          dataKey="totalCapacity" // Line for total capacity
          name="Total Capacity"
          stroke="#82ca9d" 
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default TicketPoolDashboard;
