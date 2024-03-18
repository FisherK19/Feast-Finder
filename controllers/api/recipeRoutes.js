// module.exports = router;

const express = require('express');
const multer = require('multer');
const recipeController = require('../recipecontroller');
const router = express.Router();

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use Date.now() to get a unique filename
  }
});

const upload = multer({ storage: storage });

// Recipes route
router.get('/recipes', recipeController.getAllRecipes);

// Route for deleting a recipe
router.post('/recipes/:id/delete', recipeController.deleteRecipe);

// Search Recipe Route
router.get('/search', recipeController.searchRecipes);

// Route for adding a new recipe
router.post('/recipes', upload.single('image'), recipeController.addRecipe);

module.exports = router;
