import { ResponseError } from "../application/error.js"

const validate = (schema, request) => {
    if (!request) {
        throw new ResponseError(400, 'Request body cannot be empty');
    }
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    
    if (result.error) {
        throw new ResponseError(400,result.error.message);
    } else {
        return result.value;
    }
}

export {
    validate
}