import { validate } from "../validation/validate.js";
import Joi from "joi";

const createBookingValidation = (req) => {
    return validate(Joi.object({
        showtime_id: Joi.number().required(),
        seats: Joi.array().items( Joi.string().required() ).required(),
    }), req);
}

export {
    createBookingValidation
}
