import slugify from "slugify";
import Brand from "../models/Brand";
import Category from "../models/Category";
import Product from "../models/Product";
import ProductVariant from "../models/ProductVariant";
import { cloudinaryBase64Upload } from "../utils/cloudinary";

export const fetchCategoriesList = async (req, res) => {
    try {
        const categories = await Category.find({}).exec();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).send("Lấy danh sách danh mục thất bại");
    }
};

export const fetchCategorySelected = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.categoryId }).exec();
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).send("Lấy danh mục thất bại");
    }
};

export const fetchCategoryProductSelected = async (req, res) => {
    try {
        const category = await Category.findOne({ nameAscii: req.params.categorySlug }).exec();
        const products = await Product.find({ category: category._id }).exec();
        const brands = await Brand.find({}).exec();
        const storages = await ProductVariant.find({ type: "storage" }).exec();
        return res.status(200).json({
            category,
            products,
            brands,
            storages,
        });
    } catch (error) {
        return res.status(500).send("Lấy danh mục sản phẩm thất bại");
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.categoryId }).exec();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).send("Xoá danh mục thất bại");
    }
};

export const checkListProductsAvailable = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.categoryId }).exec();
        const products = await Product.find({ category }).exec();
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

export const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;

        const result = await cloudinaryBase64Upload(image.base64);

        const category = await new Category({
            name,
            nameAscii: slugify(name).toLowerCase(),
            image: result.url,
        }).save();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).send("Thêm danh mục thất bại");
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, image } = req.body;

        let imageFile = "";
        if (image.base64) {
            const result = await cloudinaryBase64Upload(image.base64);
            imageFile = result.url;
        } else {
            imageFile = image.url;
        }

        const category = await Category.findOneAndUpdate(
            { _id: req.params.categoryId },
            {
                $set: {
                    name,
                    nameAscii: slugify(name).toLowerCase(),
                    image: imageFile,
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).send("Cập nhật danh mục thất bại");
    }
};
