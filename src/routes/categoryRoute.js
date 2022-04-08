import express from "express";
import {
    checkListProductsAvailable,
    createCategory,
    deleteCategory,
    fetchCategoriesList,
    fetchCategoryProductSelected,
    fetchCategorySelected,
    updateCategory,
} from "../controllers/categoryController";
import { isManager, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/categories", fetchCategoriesList);
router.get("/category/get-category-products/:categorySlug", fetchCategoryProductSelected);
router.get("/category/:categoryId", fetchCategorySelected);
router.get("/category/check-products/:categoryId", checkListProductsAvailable);
router.post("/category/create-category", isLogin, isManager, createCategory);
router.put("/category/update-category/:categoryId", isLogin, isManager, updateCategory);
router.delete("/category/delete-category/:categoryId", isLogin, isManager, deleteCategory);

export default router;
