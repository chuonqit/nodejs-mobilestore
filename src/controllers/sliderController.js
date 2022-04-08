import slugify from "slugify";
import Category from "../models/Category";
import Slider from "../models/Slider";
import { cloudinaryBase64Upload } from "../utils/cloudinary";

export const fetchSlidersList = async (req, res) => {
    try {
        const sliders = await Slider.find({}).exec();
        return res.status(200).json(sliders);
    } catch (error) {
        return res.status(500).send("Lấy danh sách slider thất bại");
    }
};

export const fetchSliderSelected = async (req, res) => {
    try {
        const slider = await Slider.findOne({ _id: req.params.sliderId }).exec();
        return res.status(200).json(slider);
    } catch (error) {
        return res.status(500).send("Lấy slider thất bại");
    }
};

export const deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findOneAndDelete({ _id: req.params.sliderId }).exec();
        return res.status(201).json(slider);
    } catch (error) {
        return res.status(500).send("Xoá slider thất bại");
    }
};

export const createSlider = async (req, res) => {
    try {
        const { title, url, image } = req.body;

        const result = await cloudinaryBase64Upload(image.base64, 800);

        const slider = await new Slider({
            title,
            url,
            image: result.url,
        }).save();
        return res.status(201).json(slider);
    } catch (error) {
        return res.status(500).send("Thêm slider thất bại");
    }
};

export const updateSlider = async (req, res) => {
    try {
        const { title, url, image } = req.body;

        let imageFile = "";
        if (image.base64) {
            const result = await cloudinaryBase64Upload(image.base64, 800);
            imageFile = result.url;
        } else {
            imageFile = image.url;
        }

        const slider = await Slider.findOneAndUpdate(
            { _id: req.params.sliderId },
            {
                $set: {
                    title,
                    url,
                    image: imageFile,
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(slider);
    } catch (error) {
        return res.status(500).send("Cập nhật slider thất bại");
    }
};
