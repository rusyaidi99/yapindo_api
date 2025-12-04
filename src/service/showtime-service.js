import {sequelize, DataTypes} from "../application/database.js";
import { movieService } from "./movie-service.js";
import { studioService } from "./studio-service.js";

export const showtimeService = sequelize.define("Showtime", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movie_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: movieService,
            key: 'id',
        }
    },
    studio_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: studioService,
            key: 'id',
        }
    },
    start_time: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "Showtime",
    freezeTableName: true,
    timestamps: false
});

movieService.hasMany(showtimeService, { foreignKey: "movie_id" });
showtimeService.belongsTo(movieService, { foreignKey: "movie_id" });

studioService.hasMany(showtimeService, { foreignKey: "studio_id" });
showtimeService.belongsTo(studioService, { foreignKey: "studio_id" });