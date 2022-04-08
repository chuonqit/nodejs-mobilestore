import Configuration from "../models/Configuration";

export const fetchConfigurationsList = async (req, res) => {
    try {
        const configurations = await Configuration.find({}).exec();
        return res.status(200).json(configurations);
    } catch (error) {
        return res.status(500).send("Lấy danh sách cấu hình thất bại");
    }
};

export const fetchConfigurationSelected = async (req, res) => {
    try {
        const configuration = await Configuration.findOne({ _id: req.params.configurationId }).exec();
        return res.status(200).json(configuration);
    } catch (error) {
        return res.status(500).send("Lấy cấu hình thất bại");
    }
};

export const deleteConfiguration = async (req, res) => {
    try {
        const configuration = await Configuration.findOneAndDelete({ _id: req.params.configurationId }).exec();
        return res.status(201).json(configuration);
    } catch (error) {
        return res.status(500).send("Xoá cấu hình thất bại");
    }
};

export const createConfiguration = async (req, res) => {
    try {
        const { name } = req.body;

        const configuration = await new Configuration({
            name,
        }).save();
        return res.status(201).json(configuration);
    } catch (error) {
        return res.status(500).send("Thêm cấu hình thất bại");
    }
};

export const updateConfiguration = async (req, res) => {
    try {
        const { name } = req.body;

        const configuration = await Configuration.findOneAndUpdate(
            { _id: req.params.configurationId },
            {
                $set: {
                    name,
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(configuration);
    } catch (error) {
        return res.status(500).send("Cập nhật cấu hình thất bại");
    }
};
