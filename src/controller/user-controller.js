import bcrypt from "bcrypt";
import { 
    createUserValidation,
    loginUserValidation,
} from "../validation/user-validation.js";
import { userService } from "../service/user-service.js";
import { jwtSign } from "../application/jwt.js";
import { ResponseError } from "../application/error.js";
import redis from "../application/redis.js";

const register = async (req, res, next) => {
    try {
        let userData = createUserValidation(req.body);

        const emailExist = await userService.findOne({ where: { email: userData.email } });
        
        if(emailExist)
        {
            throw new ResponseError(400,'email is already exist');
        }

        await userService.create({
            'name': userData.name,
            'password': await bcrypt.hash(userData.password,10),
            'email': userData.email,
            'role': userData?.role
        });

        return res.status(200).json({success: true, message: 'success'});
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        let userData = loginUserValidation(req.body);

        let getUser = await userService.findOne({ where: { email: userData.email } });

        if(!getUser)
        {
            throw new ResponseError(401,'email or password wrong');
        }

        const passwordMatch = await bcrypt.compare(userData.password, getUser.password)
        
        if(!passwordMatch)
        {
            throw new ResponseError(401,'email or password wrong');
        }
        
        delete getUser.get().password;
        const token = jwtSign(getUser.get());

        await redis.set(`login:${getUser.email}`, token, { EX: 60 * 60 * 12 });

        return res.status(200).json({success: true, message: 'success', data: { token } });
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}