// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   FormHelperText,
//   Button,
//   Container,
// } from "@chakra-ui/react";
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuGroup,
//   MenuDivider,
// } from "@chakra-ui/react";
// import { Avatar, WrapItem } from "@chakra-ui/react";

// const Profile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [userInfo, setUserInfo] = useState(null);

//   const handleProfileClick = () => {
//     navigate("/profile", { state: { userInfo: userInfo } });
//   };
//   const [updatedInfo, setUpdatedInfo] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [passwordMatch, setPasswordMatch] = useState(true);

//   useEffect(() => {
//     setUserInfo(location.state?.userInfo);
//   }, [location]);

//   const handleInputChange = (e) => {
//     setUpdatedInfo({
//       ...updatedInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (updatedInfo.password !== updatedInfo.confirmPassword) {
//       setPasswordMatch(false);
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:4598/user/${userInfo.iduser}`,
//         updatedInfo
//       );
//       if (response.status === 200) {
//         // Update the user info in the state
//         setUserInfo({ ...userInfo, email: updatedInfo.email });
//         alert("User information updated successfully!");
//         navigate("/");
//       } else {
//         // Handle error if user information update fails
//         console.error("Failed to update user information");
//       }
//     } catch (error) {
//       // Handle error if request fails
//       console.error("Error occurred while updating user information", error);
//     }
//   };

//   return (
//     <div className="main-content">
//       <header>
//         <h2>Profile</h2>

//         <WrapItem className="WrapItem">
//           {userInfo ? (
//             <div className="session-name">
//               <h2>{userInfo.email}</h2>
//             </div>
//           ) : (
//             <p>Loading email</p>
//           )}
//           <Menu>
//             <MenuButton colorScheme="pink">
//               <Avatar
//                 name="Dan Abrahmov"
//                 className="avatar-img"
//                 src="https://bit.ly/dan-abramov"
//               />
//             </MenuButton>
//             <MenuList>
//               <MenuGroup title="Profile">
//                 <MenuItem onClick={handleProfileClick}>My Account</MenuItem>
//                 <MenuItem>Payments </MenuItem>
//               </MenuGroup>
//               <MenuDivider />
//               <MenuGroup title="Help">
//                 <MenuItem>Docs</MenuItem>
//                 <MenuItem>FAQ</MenuItem>
//               </MenuGroup>
//               <MenuDivider />
//               <MenuItem>Logout</MenuItem>
//             </MenuList>
//           </Menu>
//         </WrapItem>
//       </header>
//       <Container>
//       {userInfo ? (
         
//         <div>
           
//           <form onSubmit={handleFormSubmit}>
//             <FormControl>
//               <FormLabel>Email address</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={updatedInfo.email}
//                 onChange={handleInputChange}
//               />

//               <FormLabel>Password</FormLabel>
//               <Input
//                 type="password"
//                 name="password"
//                 value={updatedInfo.password}
//                 onChange={handleInputChange}
//               />

//               <FormLabel>Confirm Password</FormLabel>
//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 value={updatedInfo.confirmPassword}
//                 onChange={handleInputChange}
//               />

//               {!passwordMatch && (
//                 <FormHelperText color="red">
//                   Passwords do not match
//                 </FormHelperText>
//               )}

//               <Button type="submit">Update</Button>
//             </FormControl>
//           </form>
//         </div>
         
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </Container>
      
//     </div>
//   );
// };

// export default Profile;
