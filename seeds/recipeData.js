const sequelize = require('../config/connection');
const Recipe = require('../models/Recipe'); // Import the Recipe model
const recipeData = require('./recipe-seeds.json'); // Import the recipe data from JSON file

// Function to seed the database with recipe data
const seedDatabase = async () => {
  try {
    // Synchronize the Sequelize models with the database
    await sequelize.sync({ force: true });

    // Use the bulkCreate method to insert the recipe data into the Recipe table
    const recipes = await Recipe.bulkCreate(recipeData, {
      individualHooks: true,
      returning: true,
    });

    // Log success message
    console.log('Database seeded successfully with recipe data.');
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    // Log error message if an error occurs
    console.error('Error seeding database:', error);
    
    // Exit the process with an error code
    process.exit(1);
  }
};

// Call the seedDatabase function to start seeding the database
seedDatabase();
