// controllers/api/recipeRoutes.js

const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe');

// Route handler for getting recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.render('recipe', { recipes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route handler for creating a new recipe
router.post('/', async (req, res) => {
    try {
        const { recipe_name, ingredients, directions } = req.body;
        const newRecipe = await Recipe.create({ recipe_name, ingredients, directions });
        res.redirect('/recipes');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;




