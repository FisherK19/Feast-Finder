const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe');

// Recipes route
router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const { recipeName, ingredients, directions } = req.body;
        if (!recipeName || !ingredients || !directions) {
            return res.status(400).json({ error: "Please provide values for recipeName, ingredients, and directions." });
        }
        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });
        // Save recipeName in session
        req.session.recipeName = recipeName;
        res.redirect('/recipes'); // Redirect to refresh the page
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit Recipe Route (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Render a form to edit the recipe
        res.render('edit-recipe', { recipe });
    } catch (error) {
        console.error('Error editing recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit Recipe Route (POST)
router.post('/:id/edit', async (req, res) => {
    try {
        const { recipeName, ingredients, directions } = req.body;
        const recipeId = req.params.id;
        // Find the recipe by ID
        const recipe = await Recipe.findByPk(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        // Update the recipe
        await recipe.update({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });
        res.redirect('/recipes'); // Redirect back to the recipe page
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Recipe Route (POST)
router.post('/:id/delete', async (req, res) => {
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

module.exports = router;












