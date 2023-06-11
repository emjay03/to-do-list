import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import ArchiveIcon from "@mui/icons-material/Archive";
import UpdateIcon from "@mui/icons-material/Update";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { grey,green } from '@mui/material/colors';

const colorgrey = grey[900];
const colorgreen = green[900];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

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
  const [date, setdate] = useState("");
  const [dateend, setdateend] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [updatedTodo, setUpdatedTodo] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedDateend, setUpdatedDateend] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleOpenModalUpdate = (item) => {
    setSelectedTodo(item);
    setUpdatedTodo(item.todo);
    setUpdatedDate(item.date);
    setUpdatedDateend(item.dateend);
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4598/update/${selectedTodo.no}`,
        {
          iduser: userInfo.iduser,
          todo: updatedTodo,
          date: updatedDate,
        }
      );
      if (response.status === 200) {
        alert("To-do updated successfully!");
        setOpenModalUpdate(false);
        fetchTodoList();
      } else {
        // Handle error if updating the to-do fails
      }
    } catch (error) {
      // Handle error if request fails
    }
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
    setdate(e.target.value);
  };

  const handledateend = (e) => {
    setdateend(e.target.value);
  };

  const handleAddTodo = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:4598/insert", {
      iduser: userInfo.iduser,
      todo: todo,
      date: date,
      dateend: dateend,
    });

    console.log(response); // Log the response object for debugging

    if (response.status === 201) { // Update the condition to check for status code 201
      // Clear the input field after adding the to-do
      alert("To-do added successfully!");
      setTodo("");
      setdate("");
      setdateend("");

      // Fetch the updated to-do list
      fetchTodoList();
    } else {
      // Handle error if adding the to-do fails
      alert("Failed to add the to-do. Please try again.");
    }
  } catch (error) {
    // Handle error if request fails
    console.error("An error occurred:", error);
    alert("An error occurred while adding the to-do. Please try again.");
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="home-container">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar className="head-bar" position="fixed" open={open}>
          <Toolbar>
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

            <Box width="100%">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h5"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900 }}
                >
                  TODO
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {userInfo && (
                    <Typography
                      className="session-name"
                      variant="body1"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {" "}
                      {userInfo.email}
                    </Typography>
                  )}

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
              <MenuItem onClick={handleClose}>
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
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Todo", "In progress", "Completed", "Archived"].map(
              (text, index) => (
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
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
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
            <div>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                CreateTodo  
              </Button>
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form onSubmit={handleAddTodo}>
                  <TextField
                   style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                   type="text"
                   name="todo"
                   value={todo}
                   onChange={handleTodoChange}
                   placeholder="Enter a to-do item"
          required
         
          label="Enter To-do"
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
         <TextField
                     type="datetime-local"
                     name="datetime"
                     value={date}
                     onChange={handledatetimeChange}
                     margin="normal"
                     fullWidth
                     autoFocus
         
          label="Start"
        
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
          <TextField
                     type="datetime-local"
                     name="datetime"
                     value={dateend}
                     onChange={handledateend}
                     margin="normal"
                     fullWidth
                     autoFocus
         
          label="End"
        
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
                   
                    
                   <Button variant="contained" type="submit">Add</Button>
                  </form>
                </Box>
              </Modal>
              <Modal
                open={openModalUpdate}
                onClose={handleCloseModalUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form  onSubmit={handleUpdateTodo}>
                  <TextField
   
  type="text"
  name="todo"
  value={updatedTodo}
  onChange={(e) => setUpdatedTodo(e.target.value)}
  placeholder="Enter a to-do item"
  required
  label="Enter To-do"
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

         <TextField
                     type="datetime-local"
                     name="datetime"
                     value={updatedDate}
                          onChange={(e) => setUpdatedDate(e.target.value)}
                     margin="normal"
                     fullWidth
                     autoFocus
         
          label="Start"
        
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
          <TextField
                     type="datetime-local"
                     name="datetime"
                     value={updatedDateend}
                          onChange={(e) => setUpdatedDateend(e.target.value)}
                     margin="normal"
                     fullWidth
                     autoFocus
         
          label="End"
        
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
                   
                    
                   <Button variant="contained" type="submit">Update</Button>
                  </form>
                </Box>
              </Modal>
            </div>
          </div>
          {userInfo ? (
            <div>
               

              <Card sx={{ marginTop: '30px' }}>
               
                <CardContent>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {todoList.map((item) => (
                      <Grid key={item.no} item xs={10} sm={6} md={4}>
                        <Card sx={{ marginBottom: '10px' }}>
                          <CardContent>
                            
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                              <strong>To-Do:</strong> {item.todo}
                            </p>
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
  <strong>Start Datetime:</strong> {new Date(item.date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })}{' '}
  {new Date(item.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</p>
<p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
  <strong>End Datetime:</strong> {new Date(item.dateend).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  })}{' '}
  {new Date(item.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</p>

                            <IconButton
                              onClick={() => handleDeleteTodo(item.no)}
                            >
                              <ArchiveIcon sx={{ color: grey[900]}} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleOpenModalUpdate(item)}
                            >
                              <UpdateIcon  sx={{ color: green[900]}} />
                            </IconButton>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </Box>
      </Box>
    </div>
  );
}
