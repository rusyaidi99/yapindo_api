'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Studio', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      studio_number: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      seat_capacity: { type: Sequelize.INTEGER, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Studio');
  },
};
