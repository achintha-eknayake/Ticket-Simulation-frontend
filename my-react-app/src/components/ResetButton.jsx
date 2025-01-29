import axios from 'axios';
import '../styles/ResetButton.css';

// Adedd base URL configuration for axios to simplify the URL for API requests
axios.defaults.baseURL = 'http://localhost:8080'; 

const ResetButton = () => {
  // Handler for reset button click
  const handleReset = async () => {
    try {
      // Make a POST request to reset the database via the /api/reset endpoint
      await axios.post('/api/reset');
      
      // Reload the page to reflect the changes made by the reset operation
      window.location.reload();
    } catch (error) {
      
      console.error('Reset failed', error);
      alert('Database reset failed');
    }

    try {
      // Make a POST request to stop any running threads through the /api/threads/kill endpoint
      const response = await axios.post("http://localhost:8080/api/threads/kill");
      
     
      alert(response.data.message);
    } catch (error) {
      // If stopping the threads fails, log the error and alert the user
      console.error("Error stopping threads:", error);
      alert("Failed to stop threads.");
    }
  };

  return (
    
    <button onClick={handleReset} className="reset-button">
      Reset Database
    </button>
  );
};

export default ResetButton;
