import { 
    createMovieValidation,
    updateMovieValidation
} from "../validation/movie-validation.js";
import { movieService } from "../service/movie-service.js";
import { showtimeService } from "../service/showtime-service.js";
import { ResponseError } from "../application/error.js";

const add = async (req, res, next) => {
    try {
        let movieData = createMovieValidation(req.body);

        const insertData = await movieService.create(movieData);

        return res.status(200).json({success: true, message: 'success', data: insertData});
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const movie = await movieService.findAll();

        return res.status(200).json({success: true, message: 'success', data:movie});
    } catch (error) {
        next(error);
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const movie = await movieService.findOne({ where: { id } });

        return res.status(200).json({success: true, message: 'success', data:movie});
    } catch (error) {
        next(error);
    }
}

const edit = async (req, res, next) => {
    try {
        const { id } = req.params;

        let movieData = updateMovieValidation(req.body);

        const movie = await movieService.findOne({ where: { id } });
        if (!movie) {
            throw new ResponseError(404, 'Movie not found');
        }

        await movieService.update(movieData, { where: { id: id } });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        await movieService.destroy({ where: { id: id } });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
}

const detailShowtime = async (req, res, next) => {
    try {
        const { id } = req.params;

        const showtime = await showtimeService.findAll({
            attributes: ['id', 'studio_id', 'start_time'],
            where: { 
                movie_id: id 
            }
        });

        return res.status(200).json({success: true, message: 'success', data:showtime});
    } catch (error) {
        next(error);
    }
}

export default {
    add,
    list,
    detail,
    edit,
    remove,
    detailShowtime
}