import {sequelize, DataTypes} from "../application/database.js";

export const studioService = sequelize.define("Studio", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    studio_number: {
        type: DataTypes.INTEGER,
        unique: true
    },
    seat_capacity: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "Studio",
    freezeTableName: true,
    timestamps: false
});