import User from "../models/User";

export const fetchUsersList = async (req, res) => {
    try {
        const users = await User.find({}).exec();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).send("Lấy danh sách người dùng thất bại");
    }
};

export const fetchUserSelected = async (req, res) => {
    try {
        const userSelected = await User.findOne({ _id: req.params.userId }).exec();
        return res.status(200).json(userSelected);
    } catch (error) {
        return res.status(500).send("Lấy người dùng thất bại");
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, fullname, password, role } = req.body;
        const userExist = await User.findOne({ email }).exec();
        if (userExist) {
            return res.status(400).send("Địa chỉ email đã tồn tại");
        }
        const user = await new User({ email, fullname, password, role }).save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send("Tạo người dùng thất bại");
    }
};
