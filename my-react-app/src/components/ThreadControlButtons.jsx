import React from "react";
import axios from "axios";

const ThreadControlButtons = () => {
  // Function to start threads by sending a POST request to the server
  const startThreads = async () => {
    try {
      // Send a POST request to start threads on the server
      const response = await axios.post("http://localhost:8080/api/threads/start");
      
      
      alert(response.data.message);
    } catch (error) {
      // If an error occurs, log it and alert the user that starting threads failed
      console.error("Error starting threads:", error);
      alert("Failed to start threads.");
    }
  };

  // Function to stop threads by sending a POST request to the server
  const stopThreads = async () => {
    try {
      // Send a POST request to stop threads on the server
      const response = await axios.post("http://localhost:8080/api/threads/stop");
      
      
      alert(response.data.message);
    } catch (error) {
      // If an error occurs, log it and alert the user that stopping threads failed
      console.error("Error stopping threads:", error);
      alert("Failed to stop threads.");
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Button to start threads */}
      <button onClick={startThreads} style={{ marginRight: "10px" }}>
        Start Threads
      </button>
      {/* Button to stop threads */}
      <button onClick={stopThreads}>
        Stop Threads
      </button>
    </div>
  );
};

export default ThreadControlButtons;
