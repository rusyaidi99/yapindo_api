'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BookedSeat', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Booking', key: 'id' },
        onDelete: 'CASCADE',
      },
      seat_number: { type: Sequelize.STRING, allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BookedSeat');
  },
};
