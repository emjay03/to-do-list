import React, { useEffect } from 'react';
import { useLocation , useNavigate } from "react-router-dom";
function Home() {
  const location = useLocation();
  const sessionName = location.state?.sessionName || ""; // Retrieve sessionName from location state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if sessionName is not present or empty, then navigate to the login page
    if (!sessionName) {
      navigate('/'); // Navigate to the login page
    }
  }, [sessionName, navigate]);

  return (
    <div>
         <h1>Welcome, {sessionName}!</h1>
    </div>
  )
}

export default Home