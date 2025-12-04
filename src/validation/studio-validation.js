import { validate } from "../validation/validate.js";
import Joi from "joi";

const createStudioValidation = (req) => {
    return validate(Joi.object({
        studio_number: Joi.number().required(),
        seat_capacity: Joi.number().required(),
    }), req);
}

const updateStudioValidation = (req) => {
    return validate(Joi.object({
        seat_capacity: Joi.number().required(),
    }), req);
}

export {
    createStudioValidation,
    updateStudioValidation
}
