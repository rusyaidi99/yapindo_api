import { 
    createShowtimeValidation,
    updateShowtimeValidation
} from "../validation/showtime-validation.js";
import { showtimeService } from "../service/showtime-service.js";
import { movieService } from "../service/movie-service.js";
import { studioService } from "../service/studio-service.js";
import { ResponseError } from "../application/error.js";
import {sequelize} from "../application/database.js";
import redis from "../application/redis.js";

const add = async (req, res, next) => {
    try {
        const t = await sequelize.transaction();

        let showtimeData = createShowtimeValidation(req.body);

        const movie = await movieService.findOne({ where: { id: showtimeData.movie_id }, transaction: t });
        if (!movie) {
            throw new ResponseError(404, 'Movie not found');
        }

        const studio = await studioService.findOne({ where: { id: showtimeData.studio_id }, transaction: t });
        if (!studio) {
            throw new ResponseError(404, 'Studio not found');
        }

        const showtime = await showtimeService.findOne({ 
            where: { 
                movie_id: showtimeData.movie_id,
                studio_id: showtimeData.studio_id, 
                start_time: showtimeData.start_time 
            },
            transaction: t
        });
        if (showtime) {
            throw new ResponseError(400, 'Showtime already exist');
        }

        const insertData = await showtimeService.create(showtimeData, { transaction: t });

        await generateSeatRedis(insertData.id, studio.seat_capacity);

        await t.commit();

        return res.status(200).json({success: true, message: 'success', data: insertData});
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const showtime = await showtimeService.findAll();

        return res.status(200).json({success: true, message: 'success', data:showtime});
    } catch (error) {
        next(error);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const showtime = await showtimeService.findOne({ where: { id } });

        return res.status(200).json({success: true, message: 'success', data:showtime});
    } catch (error) {
        next(error);
    }
}

const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        let showtimeData = updateShowtimeValidation(req.body);

        const movie = await movieService.findOne({ where: { id: showtimeData.movie_id } });
        if (!movie) {
            throw new ResponseError(404, 'Movie not found');
        }

        const studio = await studioService.findOne({ where: { id: showtimeData.studio_id } });
        if (!studio) {
            throw new ResponseError(404, 'Studio not found');
        }

        const showtime = await showtimeService.findOne({ 
            where: { 
                movie_id: showtimeData.movie_id,
                studio_id: showtimeData.studio_id, 
                start_time: showtimeData.start_time 
            } 
        });
        if (showtime) {
            throw new ResponseError(400, 'Showtime already exist');
        }

        await showtimeService.update(showtimeData, { where: { id: id } });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        await showtimeService.destroy({ where: { id: id } });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

const detailSeat = async (req, res, next) => {
    try {
        const { id } = req.params;

        const seats = JSON.parse(await redis.get(`showtimeseats:${id}`));

        return res.status(200).json({success: true, message: 'success', data:seats});
    } catch (error) {
        next(error);
    }
}

const generateSeatRedis = async(id, capacity) => {

    const seats = [];
    const totalSeats = capacity;
    const seatsPerRow = 20;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const totalRows = Math.ceil(totalSeats / seatsPerRow);

    for (let row = 0; row < totalRows; row++) {
        const rowLetter = alphabet[row];
        for (let num = 1; num <= seatsPerRow; num++) {
            const seatNumber = row * seatsPerRow + num;
            if (seatNumber > totalSeats) break;
            seats.push({
                seat_number: `${rowLetter}${num}`,
                status: 'Available'
            });
        }
    }

    await redis.set(`showtimeseats:${id}`, JSON.stringify(seats), { EX: 60 * 60 * 24 });
}

export default {
    add,
    list,
    detail,
    edit,
    remove,
    detailSeat
}