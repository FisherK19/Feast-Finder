// const Recipe = require('../models/recipe');
// const { Op } = require('sequelize');

// // Create a new recipe
// exports.createRecipe = async (req, res, _next) => {
//     try {
//         const { recipe_name, ingredients, directions } = req.body;
        
//         // Create the recipe in the database
//         const recipe = await Recipe.create({ recipe_name, ingredients, directions });
        
//         // Send the created recipe as JSON response
//         res.status(201).json(recipe);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a recipe
// exports.updateRecipe = async (req, res, _next) => {
//     try {
//         const { recipe_name, ingredients, directions } = req.body;
        
//         // Update the recipe in the database
//         const updatedRecipe = await Recipe.update(
//             { recipe_name, ingredients, directions },
//             { where: { id: req.params.id }, returning: true }
//         );
        
//         // Check if the recipe was found and updated
//         if (updatedRecipe[0] === 0) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }
        
//         // Send the updated recipe as JSON response
//         res.status(200).json(updatedRecipe[1][0]);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a recipe
// exports.deleteRecipe = async (req, res, _next) => {
//     try {
//         // Delete the recipe from the database
//         const deletedRecipe = await Recipe.destroy({ where: { id: req.params.id } });
        
//         // Check if the recipe was found and deleted
//         if (deletedRecipe === 0) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }
        
//         // Send success message
//         res.status(200).json({ message: 'Recipe deleted successfully' });
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all recipes
// exports.getRecipes = async (_req, res, _next) => {
//     try {
//         // Fetch all recipes from the database
//         const recipes = await Recipe.findAll();
        
//         // Send the recipes as JSON response
//         res.json(recipes);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };

// // Search recipes
// exports.searchRecipes = async (req, res, _next) => {
//     try {
//         const { query } = req.query;
//         if (!query) {
//             return res.status(400).json({ message: 'Search query is required' });
//         }
//         const recipes = await Recipe.findAll({
//             where: {
//                 recipe_name: {
//                     [Op.iLike]: `%${query}%`
//                 }
//             }
//         });
//         res.json(recipes);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ message: error.message });
//     }
// };


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
