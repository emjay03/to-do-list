import * as React  from 'react';
 import './App.css';
 import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Components/Home';
function App() {
 

  return (
    <>
   <ChakraProvider>
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </ChakraProvider>
    </>
  );
}

export default App;
