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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
