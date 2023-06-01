import * as React  from 'react';
 import './App.css';
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Pages/Home';
import Profile from './Pages/Profile';
function App() {
 

  return (
    <>
   <ChakraProvider>
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </ChakraProvider>
    </>
  );
}

export default App;
