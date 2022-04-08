import express from "express";
import {
    checkListProductsAvailable,
    createBrand,
    deleteBrand,
    fetchBrandSelected,
    fetchBrandsList,
    updateBrand,
} from "../controllers/brandController";
import { isManager, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/brands", fetchBrandsList);
router.get("/brand/:brandId", fetchBrandSelected);
router.get("/brand/check-products/:brandId", checkListProductsAvailable);
router.post("/brand/create-brand", isLogin, isManager, createBrand);
router.put("/brand/update-brand/:brandId", isLogin, isManager, updateBrand);
router.delete("/brand/delete-brand/:brandId", isLogin, isManager, deleteBrand);

export default router;
