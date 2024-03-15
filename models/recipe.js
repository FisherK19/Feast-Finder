// Import Sequelize and the required data types
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection instance
const sequelize = require('../config/connection');

// Define the Recipe model by extending Sequelize's Model class
class Recipe extends Model {}

// Initialize the Recipe model with the defined attributes and options
Recipe.init(
  {
    // Define the attributes/columns of the Recipe model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    // Configure the connection instance and table name
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

// Export the Recipe model for use in other parts of the application
module.exports = Recipe;
