'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Showtime', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Movie', key: 'id' },
        onDelete: 'CASCADE',
      },
      studio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Studio', key: 'id' },
        onDelete: 'CASCADE',
      },
      start_time: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Showtime');
  },
};
