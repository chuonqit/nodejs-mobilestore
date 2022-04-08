import slugify from "slugify";
import Category from "../models/Category";
import Product from "../models/Product";
import Slider from "../models/Slider";
import { cloudinaryBase64Upload } from "../utils/cloudinary";

export const fetchProductsList = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .populate("brand")
            .populate("configurations.configuration")
            .populate("variants.storage")
            .populate("variants.colors.color")
            .exec();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
};

export const fetchProductSelected = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.productId }).populate("category").populate("brand").exec();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).send("Lấy sản phẩm thất bại");
    }
};

export const fetchProductSelectedBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ nameAscii: req.params.productSlug })
            .populate("category")
            .populate("brand")
            .populate("configurations.configuration")
            .populate("variants.storage")
            .populate("variants.colors.color")
            .exec();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).send("Lấy sản phẩm thất bại");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.productId }).exec();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).send("Xoá sản phẩm thất bại");
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, sku, price, cost, images, description, isFeatured, category, brand, configurations, variants } = req.body;

        const skuExist = await Product.findOne({ sku }).exec();
        if (skuExist) {
            return res.status(400).send(`Mã ${sku} đã tồn tại`);
        }

        const imageList = [];
        for (const imageItem of images) {
            const imageFile = await cloudinaryBase64Upload(imageItem.base64);
            imageList.push(imageFile);
        }

        const product = await new Product({
            name,
            nameAscii: slugify(name),
            sku,
            images: imageList,
            description,
            isFeatured,
            category,
            brand,
            configurations,
            variants,
            price,
            cost,
        }).save();

        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Thêm sản phẩm thất bại");
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, images, price, cost, description, isFeatured, category, brand, configurations, variants } = req.body;

        const imageList = [];
        for (const imageItem of images) {
            if (imageItem.base64) {
                const imageFile = await cloudinaryBase64Upload(imageItem.base64);
                imageList.push(imageFile);
            } else {
                imageList.push(imageItem);
            }
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            {
                $set: {
                    name,
                    images: imageList,
                    description,
                    isFeatured,
                    category,
                    configurations,
                    variants,
                    brand,
                    price,
                    cost,
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).send("Cập nhật sản phẩm thất bại");
    }
};

export const fetchHomeData = async (req, res) => {
    try {
        const productFeatured = await Product.find({ isFeatured: true })
            .limit(8)
            .populate("category")
            .populate("brand")
            .populate("configurations.configuration")
            .populate("variants.storage")
            .populate("variants.colors.color")
            .exec();
        const bestSeller = await Product.find({ purchaseCount: { $gt: 0 } })
            .populate("category")
            .populate("brand")
            .populate("configurations.configuration")
            .populate("variants.storage")
            .populate("variants.colors.color")
            .exec();
        const categories = await Category.find({}).exec();
        const sliders = await Slider.find({}).limit(5).exec();

        const bestSellerData = bestSeller.reduce(function (r, a) {
            r[a.category._id] = r[a.category._id] || [];
            r[a.category._id].push(a);
            return r;
        }, Object.create(null));

        const results = {
            productFeatured,
            bestSellerData,
            categories,
            sliders,
        };
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
};

export const listProductRelated = async (req, res) => {
    try {
        const product = await Product.findOne({ nameAscii: req.params.productSlug }).exec();
        const related = await Product.find({
            _id: { $ne: product._id },
            category: product.category,
        })
            .limit(4)
            .populate("category")
            .exec();

        return res.status(200).json(related);
    } catch (error) {
        return res.status(400).json({
            error: "Tìm sản phẩm thất bại",
        });
    }
};

export const filterProductsCategory = async (req, res) => {
    try {
        const { brands, prices, storages } = req.query;
        let filtered = {};
        if (brands) {
            filtered.brand = brands;
        }
        if (storages) {
            filtered.variants = { $elemMatch: { storage: storages } };
        }
        if (prices === "duoi-2-trieu") {
            filtered.price = { $lte: 2000000 };
        } else if (prices === "tu-2-4-trieu") {
            filtered.price = { $gt: 2000000, $lte: 4000000 };
        } else if (prices === "tu-4-7-trieu") {
            filtered.price = { $gt: 4000000, $lte: 7000000 };
        } else if (prices === "tu-7-13-trieu") {
            filtered.price = { $gt: 7000000, $lte: 13000000 };
        } else if (prices === "tren-13-trieu") {
            filtered.price = { $gt: 13000000 };
        }

        const products = await Product.find({ category: req.params.categoryId, ...filtered }).exec();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
};

export const searchProduct = async (req, res) => {
    try {
        const products = await Product.find({ name: new RegExp(req.body.keyword, "i") })
            .populate("category")
            .exec();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            error: "Tìm kiếm sản phẩm thất bại",
        });
    }
};
