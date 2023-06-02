import * as React  from 'react';
 import './App.css';
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
 
import Home from './Pages/Home';
import Profile from './Pages/Profile';
function App() {
 

  return (
    <>
   
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
