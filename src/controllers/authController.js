import User from "../models/User";
import { generateToken, verifyToken } from "../utils/accesstoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(400).send("Không tìm thấy tài khoản");
        }
        if (!user.authenticate(password)) {
            return res.status(400).send("Mật khẩu không chính xác");
        }

        const accessToken = generateToken({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        const refreshToken = generateToken({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" });

        const currentUser = await User.findOne({ _id: user._id }).select("-password").select("-salt").exec();

        if (user.role === "MANAGER" || user.role === "ADMIN") {
            return res.status(200).json({
                accessToken,
                refreshToken,
                user: currentUser,
            });
        } else {
            return res.status(401).send("Không có quyền truy cập");
        }
    } catch (error) {
        return res.status(500).send("Đăng nhập thất bại");
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(403).send("Không được phép truy cập");
        }

        verifyToken(token, process.env.REFRESH_TOKEN_SECRET, (user, error) => {
            if (error) return res.status(401).send("Không có quyền truy cập");
            req.user = user;
        });

        const accessToken = generateToken({ _id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        return res.status(500).send("Tạo mới token thất bại");
    }
};
