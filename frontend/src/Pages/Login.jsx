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
import signup from "../images/signup.svg";
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
   <div className="container-login">
<div className="grid-login">
<div className="left-side">
 <div className="signto">
 <img src={signup} alt="signup" />
 <h1>Sign in to <br></br>Todo Hoods  </h1>
 <div>
  <p>if you don't have an account , you can register here !</p>
 </div>
 
  </div>
   
 
 
  
</div>
 
<div className="right-side">
<h2>Hello Friend </h2>
  <form onSubmit={handleFormSubmit}>
      <p>{message}</p>
     
     
     <FormControl className="FormControl"fullWidth sx={{  m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             
            label="Email"
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
           <div className="box-btn">
            
      <Button className="button-login" fullWidth   type="submit"  variant="contained">Sign in</Button>
      
       
  
    </div>
        </FormControl>
    
      
       </form>
</div>
</div>
   </div>
  );
}

export default Login;
