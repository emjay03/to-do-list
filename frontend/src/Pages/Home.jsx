import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, WrapItem } from "@chakra-ui/react";
import { RiCalendarTodoFill } from "react-icons/ri";
import { SiProgress } from "react-icons/si";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

  MenuGroup,

  MenuDivider,
} from "@chakra-ui/react";
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [todo, setTodo] = useState("");
  const [datetime, setdatetime] = useState("");
  const [todoList, setTodoList] = useState([]);

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
      navigate("/login"); // Redirect to login page if sessionName is not available
    }
  }, [location, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo && userInfo.iduser) {
        fetchTodoList(userInfo.iduser);
      }
    }, 5000);

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
 
  const handleProfileClick = () => {
    navigate("/profile", { state: { userInfo } });
  };


  return (
    <div className="home-container">
      <div className="home-body">
        <div className="side-nav">
          <h1>MJ.TODO</h1>
          <nav>
            <h2>Menu</h2>
            <ul>
              <li>
                <RiCalendarTodoFill />
                <a>Todo</a>
              </li>
              <li>
                <SiProgress />
                <a> In progress</a>
              </li>
              <li>
                <IoCheckmarkDoneSharp />
                <a>Completed</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
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
          {userInfo ? (
        <div>
          
           
          <h3>Add a To-Do</h3>
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
                <tr key={item.id}>
                  <td>{item.iduser}</td>
                  <td>{item.todo}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
        </div>
      </div>
    </div>
  );
}

export default Home;
