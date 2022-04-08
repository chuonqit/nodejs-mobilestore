import express from "express";

import {
    createProductVariant,
    deleteProductVariant,
    fetchProductVariantSelected,
    fetchProductVariantsList,
    updateProductVariant,
} from "../controllers/productVariantController";
import { isLogin, isManager } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/product-variants", fetchProductVariantsList);
router.get("/product-variant/:productVariantId", fetchProductVariantSelected);
router.post("/product-variant/create-variant", isLogin, isManager, createProductVariant);
router.put("/product-variant/update-variant/:productVariantId", isLogin, isManager, updateProductVariant);
router.delete("/product-variant/delete-variant/:productVariantId", isLogin, isManager, deleteProductVariant);

export default router;
