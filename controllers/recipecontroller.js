const Recipe = require('../models/recipe');
const { Op } = require('sequelize');

// Controller function for fetching all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.render('recipe', { recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for deleting a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await recipe.destroy();
    res.redirect('/recipes');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function for searching recipes
exports.searchRecipes = async (req, res) => {
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
};

// Controller function for adding a new recipe
exports.addRecipe = async (req, res) => {
  try {
    const { recipeName, ingredients, directions } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const newRecipe = await Recipe.create({
      recipe_name: recipeName,
      ingredients: ingredients,
      directions: directions,
      image_url: imageUrl
    });
    res.redirect('/recipes');
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
