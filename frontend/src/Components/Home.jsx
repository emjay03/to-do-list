import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    email: '',
    password: '',
  });
  const [todo, setTodo] = useState('');
  const [datetime, setdatetime] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const { state } = location;

    if (state && state.sessionName) {
      // Fetch user information using the sessionName
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`http://ec2-3-27-58-198.ap-southeast-2.compute.amazonaws.com:4598/user/${state.sessionName}`);
          if (response.status === 200) {
            setUserInfo(response.data);
            setUpdatedInfo(response.data); // Set the initial values for the form fields
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
      navigate('/login'); // Redirect to login page if sessionName is not available
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
      const response = await axios.get(`http://ec2-3-27-58-198.ap-southeast-2.compute.amazonaws.com:4598/todos/${iduser}`);
      if (response.status === 200) {
        setTodoList(response.data);
      } else {
        // Handle error if fetching the to-do list fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };
  
  
  

  const handleInputChange = (e) => {
    setUpdatedInfo({
      ...updatedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handledatetimeChange = (e) => {
    setdatetime(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://ec2-3-27-58-198.ap-southeast-2.compute.amazonaws.com:4598/user/${userInfo.iduser}`, updatedInfo);
      if (response.status === 200) {
        // Update the user info in the state
        setUserInfo({ ...userInfo, email: updatedInfo.email });
        alert('User information updated successfully!');
      } else {
        // Handle error if user information update fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://ec2-3-27-58-198.ap-southeast-2.compute.amazonaws.com:4598/insert', {
        iduser: userInfo.iduser,
        todo: todo,
        datetime: datetime,
      });
      if (response.status === 200) {
        // Clear the input field after adding the to-do
        setTodo('');
        setdatetime('');
        alert('To-do added successfully!');
        // Fetch the updated to-do list
        fetchTodoList();
      } else {
        // Handle error if adding the to-do fails
      }
    } catch (error) {
      // Handle error if request fails
    }
  };
  return (
    <div>
      {userInfo ? (
        <div>
          <h2>Welcome, {userInfo.email}!</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={updatedInfo.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Update</button>
          </form>

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
  );
}

export default Home;
