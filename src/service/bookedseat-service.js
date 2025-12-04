import {sequelize, DataTypes} from "../application/database.js";
import { bookingService } from "./booking-service.js";

export const bookedseatService = sequelize.define("BookedSeat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    booking_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: bookingService,
            key: 'id',
        }
    },
    seat_number: { 
        type: DataTypes.STRING
    }
}, {
    tableName: "BookedSeat",
    freezeTableName: true,
    timestamps: false
});

bookingService.hasMany(bookedseatService, { foreignKey: "booking_id" });
bookedseatService.belongsTo(bookingService, { foreignKey: "booking_id" });