import {sequelize, DataTypes} from "../application/database.js";

export const movieService = sequelize.define("Movie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    duration_minutes: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "Movie",
    freezeTableName: true,
    timestamps: false
});