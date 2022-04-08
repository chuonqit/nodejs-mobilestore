import res from "express/lib/response";
import jwt from "jsonwebtoken";

export const generateToken = (user, secret, options) => {
    return jwt.sign(user, secret, options);
};

export const verifyToken = (token, secret, callback) => {
    jwt.verify(token, secret, (error, user) => {
        callback(user, error);
    });
};
