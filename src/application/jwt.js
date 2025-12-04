import 'dotenv/config';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const jwtSign = (payload) => {
  return jwt.sign({ ...payload, iss: "yapindo" }, JWT_SECRET);
};

const jwtVerify = (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
};

export {
  jwtSign,
  jwtVerify
};