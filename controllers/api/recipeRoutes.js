// Import required modules
const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe');

// Route handler for getting recipes
router.get('/', async (req, res) => {
    // Logic to fetch all recipes from the database
    const recipes = await Recipe.findAll();

    // Render the recipe page with the list of recipes
    res.render('recipe', { recipes });
});

// Route handler for creating a new recipe
router.post('/', async (req, res) => {
    try {
        // Logic to create a new recipe
        
        // Retrieve the recipe data from the request body
        const { recipeName, ingredients, directions } = req.body;

        // Ensure all required fields are provided
        if (!recipeName || !ingredients || !directions) {
            return res.status(400).json({ error: "Please provide values for recipeName, ingredients, and directions." });
        }

        // Logic to create a new recipe using Sequelize or any other ORM
        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });

        // Redirect to the recipes page after successful submission
        res.redirect('/recipes');
    } catch (error) {
        // Handle any errors that occur during recipe creation
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for rendering the form to edit a recipe
router.get('/:id/edit', async (req, res) => {
    try {
        const recipeId = req.params.id;
        // Logic to fetch the details of the recipe to be edited from the database based on the recipeId
        // Example:
        const recipe = await Recipe.findByPk(recipeId);
        res.render('editRecipe', { recipe }); // Render the form with the existing recipe data
    } catch (error) {
        console.error('Error fetching recipe details for editing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;




