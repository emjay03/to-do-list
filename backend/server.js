const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 4598;

app.use(cors());
app.use(express.json());

// MySQL configuration
const db = mysql.createConnection({
  host: "mydb.cieojwvws9ux.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "sana1001101",
  database: "SAMPLE",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to handle retrieving user information
app.get('/user/:sessionName', (req, res) => {
  const { sessionName } = req.params;

  // Construct the SELECT query
  const query = 'SELECT * FROM user WHERE email = ?';

  // Execute the query with the sessionName as the parameter
  db.query(query, [sessionName], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    if (results.length === 1) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// API endpoint to handle login requests
app.post('/user', (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match a record in the database
  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    if (results.length === 1) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// API endpoint to handle viewing to-do list for a specific user
app.get('/todos/:iduser', (req, res) => {
  const { iduser } = req.params;

  // Construct the SELECT query
  const query = 'SELECT * FROM tblcreatetodo WHERE iduser = ?';

  // Execute the query with the iduser as the parameter
  db.query(query, [iduser], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    res.status(200).json(results);
  });
});

 
// API endpoint to handle adding to-do item
app.post('/insert', (req, res) => {
  const { iduser, todo ,datetime} = req.body;

  // Construct the INSERT query
  const query = 'INSERT INTO tblcreatetodo (iduser, todo,date) VALUES (?, ?, ?)';

  // Execute the query with parameterized values
  db.query(query, [iduser, todo,datetime], (error, results, fields) => {
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    console.log('To-do added successfully.');
    res.status(201).json({ message: 'To-do added successfully' });
  });
});

// API endpoint to handle updating user information
app.put('/user/:iduser', (req, res) => {
  const { iduser } = req.params;
  const { email, password } = req.body;

  // Construct the UPDATE query
  const query = 'UPDATE user SET email = ?, password = ? WHERE iduser = ?';

  // Execute the query with parameterized values
  db.query(query, [email, password, iduser], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ message: 'An error occurred' });
      return;
    }

    if (results.affectedRows === 1) {
      res.status(200).json({ message: 'User information updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
