// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = 'your_secret_key'; // Use a more secure key in production

app.use(bodyParser.json());
app.use(cors()); // Allow requests from your React app

const users = [
  { id: 1, email: 'test@example.com', password: bcrypt.hashSync('password123', 8) }
];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
  res.status(200).json({ token });
});

app.get('/api/verifyToken', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    res.status(200).json({ id: decoded.id });
  });
});

// For all GET requests, send back index.html so that the React app can handle routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
