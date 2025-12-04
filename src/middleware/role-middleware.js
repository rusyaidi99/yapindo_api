import { jwtVerify } from "../application/jwt.js";

export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const parts = authHeader.split(' ');
    const data = jwtVerify(parts[1]);

    if (!allowedRoles.includes(data.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

