'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booking', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' },
        onDelete: 'CASCADE',
      },
      showtime_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Showtime', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booking');
  },
};
