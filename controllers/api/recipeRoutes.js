const express = require('express');
const multer = require('multer');
const Recipe = require('../../models/recipe');
const { Op } = require('sequelize');
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
    router.get('/recipes', async (req, res) => {
    try {
        // Retrieve username from session
        const username = req.session.username;
        // Retrieve recipeName from session
        const recipeName = req.session.recipeName;
        // Fetch recipes from the database
        const recipes = await Recipe.findAll();
        // Render the recipes page with the username, recipeName, and recipes
        res.render('recipe', { username, recipeName, recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    // Edit Recipe Route (GET)
    router.get('/recipes/:id/edit', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Render a form to edit the recipe
        res.render('recipe', { recipe, editing: true });
    } catch (error) {
        console.error('Error editing recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    // Route for updating a specific recipe with the possibility of a new image
    router.post('/recipes/:id/edit', upload.single('image'), async (req, res) => {
    try {
      const { recipeName, ingredients, directions } = req.body;
      const recipeId = req.params.id;
      const updateData = {
        recipe_name: recipeName,
        ingredients: ingredients,
        directions: directions
      };

      if (req.file) {
        updateData.image_url = req.file.path; // Update image URL if a new image is uploaded
      }

      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      await recipe.update(updateData);
      res.redirect('/recipes'); // Redirect back to the recipes page
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


    // Delete Recipe Route (POST)
    router.post('/recipes/:id/delete', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Delete the recipe from the database
        await recipe.destroy();
        res.redirect('/recipes'); // Redirect back to the recipe page
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    // Search Recipe Route (GET)
    router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        const recipes = await Recipe.findAll({
            where: {
                recipe_name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });
        res.render('recipe', { recipes });
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    router.post('/recipes', upload.single('image'), async (req, res) => {
    try {
        // Extract the recipe data from the request body
        const { recipeName, ingredients, directions } = req.body;
        
        // If an image was uploaded, set the image URL; otherwise, use null
        const imageUrl = req.file ? req.file.path : null;

        // Create the recipe object with image URL
        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions,
            image_url: imageUrl // Save the image URL in the database
        });

        // Redirect to the recipes page
        res.redirect('/recipes');
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;








