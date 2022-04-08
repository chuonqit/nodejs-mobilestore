import express from "express";
import { refreshToken, Login } from "../controllers/authController";

const router = express.Router();

router.post("/auth/login", Login);
router.post("/auth/refresh-token", refreshToken);

export default router;
