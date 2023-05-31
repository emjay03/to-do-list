import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Container } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const postUrl = "http://localhost:4598/user";

    try {
      const response = await axios.post(postUrl, {
        email,
        password,
      });
  
      if (response.status === 200) {
        
        const sessionName = email; // Use the email as the session name
        alert("Login Successfull");
       
        navigate("/home", { state: { sessionName } }); // Pass sessionName as state when redirecting
      } else {
        setMessage("An error occurred");
      }
    } catch (error) {
      if (error.response) {
        setMessage("Invalid credentials");
      } else {
        setMessage("An error occurred");
      }
     
    }
  };

  return (
    <div className="login-container">
       
      <Container className="container-card" maxW="lg">
        <form onSubmit={handleFormSubmit}>
          <FormControl className="FormControl">
            <p>{message}</p>
            <div className="head-sign">
              <h2>SIGN IN</h2>
              <p>What are you waiting for? Sign in now!</p>
            </div>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="forgot">
              <p>Forgot Password?</p>
            </div>
            <div className="login-btn">
              <Button colorScheme="blue" type="submit">
                Sign in
              </Button>
            </div>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}

export default Login;
