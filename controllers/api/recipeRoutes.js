// Import required modules
const express = require('express');
const router = express.Router();
const Recipe = require('../../models/recipe'); // Correct import statement for Recipe model
const recipeController = require('../recipecontroller'); // Correct import statement for recipeController

// Define routes
router.get('/', recipeController.getRecipes);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

// Route handler for creating a new recipe
router.post('/recipes', async (req, res) => {
    try {
        // Retrieve the recipe data from the request body
        const { recipeName, ingredients, directions } = req.body;

        // You can add validation logic here to ensure that all required fields are provided

        // Logic to create a new recipe using Sequelize or any other ORM
        const newRecipe = await Recipe.create({
            recipe_name: recipeName,
            ingredients: ingredients,
            directions: directions
        });

        // Send a success response
        res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (error) {
        // Handle any errors that occur during recipe creation
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;



