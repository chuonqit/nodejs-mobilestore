import express from "express";
import {
    createProduct,
    deleteProduct,
    fetchHomeData,
    fetchProductSelected,
    fetchProductSelectedBySlug,
    fetchProductsList,
    filterProductsCategory,
    listProductRelated,
    searchProduct,
    updateProduct,
} from "../controllers/productController";
import { isLogin, isManager } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/products", fetchProductsList);
router.get("/products/get-home-data", fetchHomeData);
router.post("/product/search-product", searchProduct);
router.get("/products/filter-products-category/:categoryId", filterProductsCategory);
router.get("/products/get-product-related/:productSlug", listProductRelated);
router.get("/product/:productId", fetchProductSelected);
router.get("/product/get-product-detail/:productSlug", fetchProductSelectedBySlug);
router.post("/product/create-product", isLogin, isManager, createProduct);
router.put("/product/update-product/:productId", isLogin, isManager, updateProduct);
router.delete("/product/delete-product/:productId", isLogin, isManager, deleteProduct);

export default router;
