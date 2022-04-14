import User from "../models/User";
import Formidable from "formidable";
import FetchExcelData from "../utils/fetchDataExcel";

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

export const updateUser = async (req, res) => {
    try {
        const { fullname, role } = req.body;
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: { fullname, role } }, { new: true }).exec();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send("Tạo người dùng thất bại");
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId }).exec();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send("Xoá người dùng thất bại");
    }
};

export const getUserWithExcel = async (req, res) => {
    try {
        const form = new Formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            const userData = FetchExcelData(files.excel.filepath);
            const newData = userData.map((item) => {
                return {
                    email: item[0],
                    password: item[0].split("@")[0],
                    fullname: item[1],
                    phoneNumber: item[2],
                    role: item[3],
                };
            });
            res.status(201).json(newData);
        });
    } catch (error) {
        return res.status(500).send("Tạo người dùng thất bại");
    }
};

export const importUserWithExcel = async (req, res) => {
    try {
        await User.insertMany(req.body.users);
        res.status(201).json({ ok: true });
    } catch (error) {
        return res.status(500).send("Tạo người dùng thất bại");
    }
};
