const Recipe = require('../models/recipe'); 

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); 
    res.json(recipes); // Send the recipes as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;
    const recipe = await Recipe.create({ title, ingredients, instructions, image }); 
    res.status(201).json(recipe); // Send the created recipe as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions, image }, { new: true }); // Find and update the recipe in the database
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' }); // Handle case where recipe is not found
    }
    res.status(200).json(updatedRecipe); // Send the updated recipe as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id); // Find and delete the recipe in the database
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' }); // Handle case where recipe is not found
    }
    res.status(200).json({ message: 'Recipe deleted successfully' }); // Send success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};


