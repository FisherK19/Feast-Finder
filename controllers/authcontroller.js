// Import necessary modules
const express = require('express');
const app = express();

// Import middleware
const { authenticateUser } = require('../utils/auth');

// Import route controllers
const registerRoute = require('../controllers/api/registerRoute');
const loginRoute = require('../controllers/api/loginRoute');

// Define routes
app.post('/signup', registerRoute.signup);
app.post('/login', loginRoute.login);

// Protected route (requires authentication)
app.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
