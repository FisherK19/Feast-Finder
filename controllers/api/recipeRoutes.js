// Import required modules
const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe'); // Correct import path

// Route handler for getting recipes
router.get('/', async (req, res) => {
    try {
        // Logic to fetch all recipes from the database
        const recipes = await Recipe.findAll();

        // Render the recipe page with the list of recipes
        res.render('recipe', { recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for creating a new recipe
router.post('/', async (req, res) => {
    try {
        // Logic to create a new recipe
        
        // Retrieve the recipe data from the request body
        const { recipe_name, ingredients, directions } = req.body;

        // Ensure all required fields are provided
        if (!recipe_name || !ingredients || !directions) {
            return res.status(400).json({ error: "Please provide values for recipe_name, ingredients, and directions." });
        }

        // Logic to create a new recipe using Sequelize or any other ORM
        const newRecipe = await Recipe.create({
            recipe_name: recipe_name,
            ingredients: ingredients,
            directions: directions
        });

        // Redirect to the recipes page after successful submission
        res.redirect('/recipes');
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for deleting a recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        // Logic to find the recipe by its ID and delete it from the database
        await Recipe.destroy({ where: { id: recipeId } });

        // Redirect to the recipes page after successful deletion
        res.redirect('/recipes');
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route handler for rendering the form to edit a recipe
router.get('/:id/edit', async (req, res) => {
    try {
        const recipeId = req.params.id;
        // Logic to fetch the details of the recipe to be edited from the database based on the recipeId
        
        const recipe = await Recipe.findByPk(recipeId);
        res.render('editRecipe', { recipe }); // Render the form with the existing recipe data
    } catch (error) {
        console.error('Error fetching recipe details for editing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;






