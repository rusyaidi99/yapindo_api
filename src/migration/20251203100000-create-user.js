'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  },
};
