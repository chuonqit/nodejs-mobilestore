import express from "express";
import { createUser, deleteUser, fetchUserSelected, fetchUsersList, getUserWithExcel, importUserWithExcel, updateUser } from "../controllers/userController";
import { isAdmin, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/users", isLogin, isAdmin, fetchUsersList);
router.get("/user/:userId", isLogin, isAdmin, fetchUserSelected);
router.put("/user/update-user/:userId", isLogin, isAdmin, updateUser);
router.delete("/user/delete-user/:userId", isLogin, isAdmin, deleteUser);
router.post("/user/create-user", isLogin, isAdmin, createUser);
router.post("/user/get-user-excel", isLogin, isAdmin, getUserWithExcel);
router.post("/user/import-user-excel", isLogin, isAdmin, importUserWithExcel);

export default router;
