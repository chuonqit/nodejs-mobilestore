import User from "../models/User";
import { verifyToken } from "../utils/accesstoken";

export const isLogin = (req, res, next) => {
    const headerToken = req.headers["authorization"];
    const accessToken = headerToken && headerToken.split(" ")[1];

    if (headerToken === undefined) {
        return res.status(403).send("Không được phép truy cập");
    }

    verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET, (user, error) => {
        if (error) {
            return res.status(403).send("Không được phép truy cập");
        }
        req.profile = user;
        next();
    });
};

export const isManager = async (req, res, next) => {
    const profile = await User.findOne({ _id: req.profile._id }).exec();
    if (profile.role === "MANAGER" || profile.role === "ADMIN") {
        return next();
    }
    return res.status(401).send("Không có quyền thực hiện");
};

export const isAdmin = async (req, res, next) => {
    const profile = await User.findOne({ _id: req.profile._id }).exec();
    if (profile.role !== "ADMIN") {
        return res.status(401).send("Không có quyền thực hiện");
    }
    next();
};
