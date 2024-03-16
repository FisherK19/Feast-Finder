// Define the Recipe model
const sequelize = require('../config/connection');

const { Model, DataTypes } = require('sequelize');

class Recipe extends Model {}

// Define the Recipe schema
Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false
  },
  directions: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'recipe',
  tableName: 'recipe', 
  underscored: true
});


module.exports = Recipe;
