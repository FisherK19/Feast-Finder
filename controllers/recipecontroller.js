const Recipe = require('../models/recipe');

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll(); 
    res.json(recipes); // Send the recipes as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { recipe_name, ingredients, directions } = req.body;
    const recipe = await Recipe.create({ recipe_name, ingredients, directions }); 
    res.status(201).json(recipe); // Send the created recipe as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { recipe_name, ingredients, directions } = req.body;
    const updatedRecipe = await Recipe.update(
      { recipe_name, ingredients, directions },
      { where: { id: req.params.id }, returning: true }
    );
    if (updatedRecipe[0] === 0) {
      return res.status(404).json({ message: 'Recipe not found' }); // Handle case where recipe is not found
    }
    res.status(200).json(updatedRecipe[1][0]); // Send the updated recipe as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.destroy({ where: { id: req.params.id } });
    if (deletedRecipe === 0) {
      return res.status(404).json({ message: 'Recipe not found' }); // Handle case where recipe is not found
    }
    res.status(200).json({ message: 'Recipe deleted successfully' }); // Send success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};



