import express from "express";
import { createSlider, deleteSlider, fetchSliderSelected, fetchSlidersList, updateSlider } from "../controllers/sliderController";
import { isManager, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/sliders", fetchSlidersList);
router.get("/slider/:sliderId", fetchSliderSelected);
router.post("/slider/create-slider", isLogin, isManager, createSlider);
router.put("/slider/update-slider/:sliderId", isLogin, isManager, updateSlider);
router.delete("/slider/delete-slider/:sliderId", isLogin, isManager, deleteSlider);

export default router;
