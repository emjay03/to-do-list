import React, { useEffect, useState } from "react";
// Header.js

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Avatar, WrapItem } from "@chakra-ui/react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleProfileClick = () => {
    navigate("/profile", { state: { userInfo: userInfo } });
  };

  useEffect(() => {
    const { state } = location;

    if (state && state.sessionName) {
      // Fetch user information using the sessionName
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4598/user/${state.sessionName}`
          );
          if (response.status === 200) {
            setUserInfo(response.data);
          } else {
            // Handle error if user information retrieval fails
          }
        } catch (error) {
          // Handle error if request fails
        }
      };

      fetchUserInfo();
    } else {
      navigate("/"); // Redirect to login page if sessionName is not available
    }
  }, [location, navigate]);

  return (
    <header>
      <h2>Overview</h2>

      <WrapItem className="WrapItem">
        {userInfo ? (
          <div className="session-name">
            <h2>{userInfo.email}</h2>
          </div>
        ) : (
          <p>Loading email</p>
        )}
        <Menu>
          <MenuButton colorScheme="pink">
            <Avatar
              name="Dan Abrahmov"
              className="avatar-img"
              src="https://bit.ly/dan-abramov"
            />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem onClick={handleProfileClick}>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </WrapItem>
    </header>
  );
}

export default Header;
