import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Button from '@mui/material/Button';
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [todo, setTodo] = useState("");
  const [datetime, setdatetime] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [openmodal, setOpenmodal] = React.useState(false);
  const handleOpenmodal = () => setOpen(true);
  const handleClosemodal = () => setOpen(false);
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
            fetchTodoList(response.data.iduser); // Fetch the to-do list for the logged-in user
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo && userInfo.iduser) {
        fetchTodoList(userInfo.iduser);
      }
    }, 100);

    // Fetch initial data
    if (userInfo && userInfo.iduser) {
      fetchTodoList(userInfo.iduser);
    }

    return () => {
      clearInterval(interval);
    };
  }, [userInfo]);

  const fetchTodoList = async (iduser) => {
    try {
      const response = await axios.get(`http://localhost:4598/todos/${iduser}`);
      if (response.status === 200) {
        setTodoList(response.data);
      } else {
        // Handle error if fetching the to-do list fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handledatetimeChange = (e) => {
    setdatetime(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4598/insert", {
        iduser: userInfo.iduser,
        todo: todo,
        datetime: datetime,
      });
      if (response.status === 200) {
        // Clear the input field after adding the to-do
        setTodo("");
        setdatetime("");
        alert("To-do added successfully!");
        // Fetch the updated to-do list
        fetchTodoList();
      } else {
        // Handle error if adding the to-do fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };
  const handleDeleteTodo = async (no) => {
    try {
      const response = await axios.delete(`http://localhost:4598/delete/${no}`);
      if (response.status === 200) {
        alert("To-do deleted successfully!");
       
      } else {
        // Handle error if deleting the to-do fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };
  

  const handleProfileClick = () => {
    navigate("/profile", { state: { userInfo } });
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
    <div className="home-container">
      <Box sx={{ display: "flex" }}>
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
            <div className="head-tool">
            <Typography variant="h6" noWrap component="div">
              TODO
            </Typography>
            <div className="user-head">
              {userInfo ? (
                <h2 className="session-name">{userInfo.email}</h2>
              ) : (
                <p>Loading email</p>
              )}
               <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
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
              </Box>
              </div>
             
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
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Todo", "In progress", "Completed", "Archived"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
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
            {["Team", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
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
          <div>
      <Button onClick={handleOpenmodal}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              name="todo"
              value={todo}
              onChange={handleTodoChange}
              placeholder="Enter a to-do item"
            />
            <input
              type="datetime-local"
              name="datetime"
              value={datetime}
              onChange={handledatetimeChange}
            />
            <button type="submit">Add</button>
          </form>
          </Typography>
         
        </Box>
      </Modal>
    </div>
          {userInfo ? (
        <div>
          
           
          <h3>Add a To-Do</h3>
          

          <h3>To-Do List</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>To-Do</th>
                <th>Date time</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((item) => (
                <tr key={item.no}>
                  <td>{item.iduser}</td>
                  <td>{item.todo}</td>
                  <td>{item.date}</td>
                  <td>
    <button onClick={() => handleDeleteTodo(item.no)}>Delete</button>
  </td>
  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
        
     
          
        </Box>
      </Box>
    </div>
  );
}
