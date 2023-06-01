import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
 
 

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
 
  const [userInfo, setUserInfo] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);


  
  useEffect(() => {
    setUserInfo(location.state?.userInfo);
  }, [location]);

  const handleInputChange = (e) => {
    setUpdatedInfo({
      ...updatedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (updatedInfo.password !== updatedInfo.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4598/user/${userInfo.iduser}`,
        updatedInfo
      );
      if (response.status === 200) {
        // Update the user info in the state
        setUserInfo({ ...userInfo, email: updatedInfo.email });
        alert('User information updated successfully!');
        navigate("/");
      } else {
        // Handle error if user information update fails
        console.error('Failed to update user information');
      }
    } catch (error) {
      // Handle error if request fails
      console.error('Error occurred while updating user information', error);
    }
  };

  return (
    <div>
 
      {userInfo ? (
        <div>
          <h2>Welcome, {userInfo.email}!</h2>
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={updatedInfo.email}
                onChange={handleInputChange}
              />

              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={updatedInfo.password}
                onChange={handleInputChange}
              />

              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={updatedInfo.confirmPassword}
                onChange={handleInputChange}
              />

              {!passwordMatch && (
                <FormHelperText color="red">
                  Passwords do not match
                </FormHelperText>
              )}

              <Button type="submit">Update</Button>
            </FormControl>
          </form>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
