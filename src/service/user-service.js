import {sequelize, DataTypes} from "../application/database.js";

export const userService = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user"
    }
}, {
    tableName: "User",
    freezeTableName: true,
    timestamps: false
});