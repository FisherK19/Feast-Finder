const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe');
const { Op } = require('sequelize');
const multer = require('multer');

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

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

// Update Recipe Route (POST)
router.post('/recipes/:id/edit', async (req, res) => {
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

// Image Upload Route (POST)
router.post('/upload-image', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.path; 
        // Update the recipe record with the image URL
        const recipe = await Recipe.findByPk(req.body.recipeId);
        if (recipe) {
            recipe.imageUrl = imageUrl;
            await recipe.save();
            res.status(200).json({ imageUrl });
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;









