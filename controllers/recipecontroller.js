const Recipe = require('../models/recipe');

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
    try {
        const { recipe_name, ingredients, directions } = req.body;
        
        // Create the recipe in the database
        const recipe = await Recipe.create({ recipe_name, ingredients, directions });
        
        // Send the created recipe as JSON response
        res.status(201).json(recipe);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Update a recipe
exports.updateRecipe = async (req, res, next) => {
    try {
        const { recipe_name, ingredients, directions } = req.body;
        
        // Update the recipe in the database
        const updatedRecipe = await Recipe.update(
            { recipe_name, ingredients, directions },
            { where: { id: req.params.id }, returning: true }
        );
        
        // Check if the recipe was found and updated
        if (updatedRecipe[0] === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Send the updated recipe as JSON response
        res.status(200).json(updatedRecipe[1][0]);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res, next) => {
    try {
        // Delete the recipe from the database
        const deletedRecipe = await Recipe.destroy({ where: { id: req.params.id } });
        
        // Check if the recipe was found and deleted
        if (deletedRecipe === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Send success message
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Get all recipes
exports.getRecipes = async (req, res, next) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.findAll();
        
        // Send the recipes as JSON response
        res.json(recipes);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

