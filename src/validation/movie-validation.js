import { validate } from "../validation/validate.js";
import Joi from "joi";

const createMovieValidation = (req) => {
    return validate(Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().required(),
        duration_minutes: Joi.number().required()
    }), req);
}

const updateMovieValidation = (req) => {
    return validate(Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().required(),
        duration_minutes: Joi.number().required()
    }), req);
}

export {
    createMovieValidation,
    updateMovieValidation
}
