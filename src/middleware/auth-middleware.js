import redis from "../application/redis.js";
import { jwtVerify } from "../application/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }

        const data = jwtVerify(parts[1]);

        if(!data || data.iss != 'yapindo')
        {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }

        const saved_token = await redis.get(`login:${data.email}`);
        
        if(saved_token != parts[1])
        {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }

        next();
    }
}
