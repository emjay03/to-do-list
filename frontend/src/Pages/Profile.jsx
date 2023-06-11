import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
 
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
 
 
import Avatar from "@mui/material/Avatar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
 

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState,useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Profile() {
    

 
    const location = useLocation();
    const navigate = useNavigate();
  
    const [userInfo, setUserInfo] = useState(null);
  
    const handleProfileClick = () => {
      navigate("/profile", { state: { userInfo: userInfo } });
    };
    
           const handleLogout = () => {
        // Clear any user-related data or authentication tokens from local storage or session storage
        // For example:
        localStorage.removeItem('userInfo'); // Remove the userInfo item from local storage
      
        navigate('/'); // Redirect the user to the login page
      };
    const [updatedInfo, setUpdatedInfo] = useState({
      email: "",
      password: "",
      confirmPassword: "",
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
          `http://ec2-3-27-58-198.ap-southeast-2.compute.amazonaws.com:4598/user/${userInfo.iduser}`,
          updatedInfo
        );
        if (response.status === 200) {
          // Update the user info in the state
          setUserInfo({ ...userInfo, email: updatedInfo.email });
          alert("User information updated successfully!");
          navigate("/");
        } else {
          // Handle error if user information update fails
          console.error("Failed to update user information");
        }
      } catch (error) {
        // Handle error if request fails
        console.error("Error occurred while updating user information", error);
      }
    };
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className="head-bar" position="fixed" open={open}>
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box width="100%" >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>TODO</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          
          {userInfo && (
 <Typography className="session-name" variant="body1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}> {userInfo.email}</Typography>
              ) }
         
          <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
        </div>
      </Grid>
    </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={opens}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleProfileClick}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            
          </Toolbar>
        </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="main-content">
     <h1   style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>Update Profile</h1>
      <Container>
      {userInfo ? (
         
        <div>
           
          <form onSubmit={handleFormSubmit}>
          <Box width="100%">
  <TextField
    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
    type="email"
    name="email"
    value={updatedInfo.email}
    onChange={handleInputChange}
    placeholder="Enter Email"
    required
    label="Email"
    fullWidth
    InputProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
      },
      inputProps: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
        },
      },
    }}
    InputLabelProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
      },
      shrink: true,
    }}
  />

  {/* Add margin bottom to create space */}
  <Box marginBottom={2} />

  <TextField
    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
    type="password"
    name="password"
    value={updatedInfo.password}
    onChange={handleInputChange}
    placeholder="Enter Password"
    required
    label="Password"
    fullWidth
    InputProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
      },
      inputProps: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
        },
      },
    }}
    InputLabelProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
      },
      shrink: true,
    }}
  />

  {/* Add margin bottom to create space */}
  <Box marginBottom={2} />

  <TextField
    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
    type="password"
    name="confirmPassword"
    value={updatedInfo.confirmPassword}
    onChange={handleInputChange}
    placeholder="Enter ConfirmPassword"
    required
    label="ConfirmPassword"
    fullWidth
    InputProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
      },
      inputProps: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
        },
      },
    }}
    InputLabelProps={{
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
      },
      shrink: true,
    }}
  />

  {/* Add margin bottom to create space */}
  <Box marginBottom={2} />

  {!passwordMatch && (
    <FormHelperText color="red">
      Passwords do not match
    </FormHelperText>
  )}

  <Button   style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }} variant="contained" color="primary"  type="submit">Update</Button>
</Box>
           

               

             

          </form>
        </div>
         
      ) : (
        <p>Loading user information...</p>
      )}
    </Container>
      
    </div>
        
      </Box>
    </Box>
  );
}
