import express from "express";
import {
    createOrderAdmin,
    deleteOrder,
    fetchOrderSelected,
    fetchOrdersList,
    fetchProductsListInOrders,
    orderByCustomer,
    updateOrderAdmin,
    updateOrderStatus,
} from "../controllers/orderController";
import { isLogin, isManager } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/orders", isLogin, isManager, fetchOrdersList);
router.get("/order/search-products-list", isLogin, isManager, fetchProductsListInOrders);
router.put("/order/update-status/:orderId", isLogin, isManager, updateOrderStatus);
router.put("/order/update-order/:orderId", isLogin, isManager, updateOrderAdmin);
router.delete("/order/delete-order/:orderId", isLogin, isManager, deleteOrder);
router.post("/order/create-order", isLogin, isManager, createOrderAdmin);
router.get("/order/:orderId", isLogin, isManager, fetchOrderSelected);
router.post("/order/order-by-customer", orderByCustomer);

export default router;
