'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movie', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      duration_minutes: { type: Sequelize.INTEGER, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movie');
  },
};
