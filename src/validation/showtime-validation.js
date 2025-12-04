import { validate } from "../validation/validate.js";
import Joi from "joi";

const createShowtimeValidation = (req) => {
    return validate(Joi.object({
        movie_id: Joi.number().required(),
        studio_id: Joi.number().required(),
        start_time: Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).required().messages({
          "string.pattern.base": "start_time format must be: YYYY-MM-DD HH:MM",
        })
    }), req);
}

const updateShowtimeValidation = (req) => {
    return validate(Joi.object({
        movie_id: Joi.number().required(),
        studio_id: Joi.number().required(),
        start_time: Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).required().messages({
          "string.pattern.base": "start_time format must be: YYYY-MM-DD HH:MM",
        })
    }), req);
}

export {
    createShowtimeValidation,
    updateShowtimeValidation
}
