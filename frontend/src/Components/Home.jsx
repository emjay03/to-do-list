import React from 'react'
import { useLocation } from "react-router-dom";
function Home() {
    const location = useLocation();
  const sessionName = location.state?.sessionName || ""; // Retrieve sessionName from location state

  return (
    <div>
         <h1>Welcome, {sessionName}!</h1>
    </div>
  )
}

export default Home