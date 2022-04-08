import slugify from "slugify";
import Brand from "../models/Brand";
import Product from "../models/Product";

export const fetchBrandsList = async (req, res) => {
    try {
        const brands = await Brand.find({}).exec();
        return res.status(200).json(brands);
    } catch (error) {
        return res.status(500).send("Lấy danh sách thương hiệu thất bại");
    }
};

export const fetchBrandSelected = async (req, res) => {
    try {
        const brand = await Brand.findOne({ _id: req.params.brandId }).exec();
        return res.status(200).json(brand);
    } catch (error) {
        return res.status(500).send("Lấy thương hiệu thất bại");
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findOneAndDelete({ _id: req.params.brandId }).exec();
        return res.status(201).json(brand);
    } catch (error) {
        return res.status(500).send("Xoá thương hiệu thất bại");
    }
};

export const checkListProductsAvailable = async (req, res) => {
    try {
        const brand = await Brand.findOne({ _id: req.params.brandId }).exec();
        const products = await Product.find({ brand }).exec();
        if (products.length > 0) {
            return res.status(200).json({
                existed: true,
            });
        }
        return res.status(200).json({
            existed: false,
        });
    } catch (error) {
        return res.status(500).send("Kiểm tra thất bại");
    }
};

export const createBrand = async (req, res) => {
    try {
        const { name } = req.body;

        const brand = await new Brand({
            name,
            nameAscii: slugify(name),
        }).save();
        return res.status(201).json(brand);
    } catch (error) {
        return res.status(500).send("Thêm thương hiệu thất bại");
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;

        const brand = await Brand.findOneAndUpdate(
            { _id: req.params.brandId },
            {
                $set: {
                    name,
                    nameAscii: slugify(name),
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(brand);
    } catch (error) {
        return res.status(500).send("Cập nhật thương hiệu thất bại");
    }
};
