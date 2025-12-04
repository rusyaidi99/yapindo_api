import {sequelize, DataTypes} from "../application/database.js";
import { userService } from "./user-service.js";
import { showtimeService } from "./showtime-service.js";

export const bookingService = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userService,
            key: 'id',
        }
    },
    showtime_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: showtimeService,
            key: 'id',
        }
    }
}, {
    tableName: "Booking",
    freezeTableName: true,
    timestamps: false
});

userService.hasMany(bookingService, { foreignKey: "user_id" });
bookingService.belongsTo(userService, { foreignKey: "user_id" });

showtimeService.hasMany(bookingService, { foreignKey: "showtime_id" });
bookingService.belongsTo(showtimeService, { foreignKey: "showtime_id" });