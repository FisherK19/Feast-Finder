const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// POST request to add a new recipe
router.post('/', async (req, res) => {
    try {
        const { recipeName, ingredients, directions } = req.body;
        // Validate the data here if needed

        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });

        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;








