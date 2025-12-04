import { validate } from "../validation/validate.js";
import Joi from "joi";

const createUserValidation = (req) => {
    return validate(Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(225).required(),
        role: Joi.string().valid("admin", "user")
    }), req);
}

const loginUserValidation = (req) => {
    return validate(Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().max(225).required(),
    }), req);
}

export {
    createUserValidation,
    loginUserValidation
}
