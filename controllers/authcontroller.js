// Import necessary modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

// Import middleware
const { authenticateUser } = require('../utils/auth');

// Import route controllers
const registerRoute = require('../controllers/api/registerRoute');
const loginRoute = require('../controllers/api/loginRoute');

// Create Express app
const app = express();

// Set up session and cookie parser middleware
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Set up body parser for form data
app.use(express.urlencoded({ extended: false }));

// Set up static directory for serving images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set up multer for handling image uploads
const upload = multer({ dest: 'uploads/' });

// Define routes
app.post('/signup', registerRoute.signup);
app.post('/login', loginRoute.login);

// Protected route for uploading image
app.post('/upload-image', authenticateUser, upload.single('image'), (req, res) => {
  // Handle image upload
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Process the uploaded file (e.g., save to storage, update database)
  res.status(200).json({ message: 'Image uploaded successfully', imageUrl: `/images/${file.filename}` });
});

// Protected route for editing a post
app.post('/edit-post/:postId', authenticateUser, (req, res) => {
  // Check if the user is authorized to edit the post
  // If authorized, proceed with editing
  // Otherwise, send a 403 Forbidden response
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
