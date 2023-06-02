import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
 
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="login-container">
        <CssBaseline />

        
      
       <div className="container-card">
      <form onSubmit={handleFormSubmit}>
      <p>{message}</p>
     
     <FormControl>
     <FormControl fullWidth sx={{  m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             
            label="Password"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
           
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
           <div className="login-btn">
             <Stack direction="row" spacing={2}>
      <Button type="submit" variant="contained">Sign in</Button>
      
       
    </Stack>
    </div>
        </FormControl>
        </FormControl>
      
       </form>
     
      <div>
         
       </div> 
       
      </div>
   
      
{/*        
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
      </Container> */}
    </div>
  );
}

export default Login;
