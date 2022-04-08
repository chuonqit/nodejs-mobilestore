import slugify from "slugify";
import ProductVariant from "../models/ProductVariant";

export const fetchProductVariantsList = async (req, res) => {
    try {
        const productVariants = await ProductVariant.find({}).exec();
        return res.status(200).json(productVariants);
    } catch (error) {
        return res.status(500).send("Lấy danh sách biến thể sản phẩm thất bại");
    }
};

export const fetchProductVariantSelected = async (req, res) => {
    try {
        const productVariant = await ProductVariant.findOne({ _id: req.params.productVariantId }).exec();
        return res.status(200).json(productVariant);
    } catch (error) {
        return res.status(500).send("Lấy biến thể sản phẩm thất bại");
    }
};

export const deleteProductVariant = async (req, res) => {
    try {
        const productVariant = await ProductVariant.findOneAndDelete({ _id: req.params.productVariantId }).exec();
        return res.status(201).json(productVariant);
    } catch (error) {
        return res.status(500).send("Xoá biến thể sản phẩm thất bại");
    }
};

export const createProductVariant = async (req, res) => {
    try {
        const { name, type } = req.body;

        const productVariant = await new ProductVariant({
            name,
            type,
            nameAscii: slugify(name).toLowerCase(),
        }).save();

        return res.status(201).json(productVariant);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Thêm biến thể sản phẩm thất bại");
    }
};

export const updateProductVariant = async (req, res) => {
    try {
        const { name, type } = req.body;

        const productVariant = await ProductVariant.findOneAndUpdate(
            { _id: req.params.productVariantId },
            {
                $set: { name, type, nameAscii: slugify(name).toLowerCase() },
            },
            { new: true }
        ).exec();
        return res.status(201).json(productVariant);
    } catch (error) {
        return res.status(500).send("Cập nhật biến thể sản phẩm thất bại");
    }
};
