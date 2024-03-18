'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('recipe', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipe', 'image_url');
  }
};
