import express from "express";
import { createUser, fetchUserSelected, fetchUsersList } from "../controllers/userController";
import { isAdmin, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/users", isLogin, isAdmin, fetchUsersList);
router.get("/user/:userId", isLogin, isAdmin, fetchUserSelected);
router.post("/user/create-user", isLogin, isAdmin, createUser);

export default router;
