import express from "express";
import {
    createConfiguration,
    deleteConfiguration,
    fetchConfigurationSelected,
    fetchConfigurationsList,
    updateConfiguration,
} from "../controllers/configurationController";
import { isManager, isLogin } from "../middlewares/Authenticate";

const router = express.Router();

router.get("/configurations", fetchConfigurationsList);
router.get("/configuration/:configurationId", fetchConfigurationSelected);
router.post("/configuration/create-configuration", isLogin, isManager, createConfiguration);
router.put("/configuration/update-configuration/:configurationId", isLogin, isManager, updateConfiguration);
router.delete("/configuration/delete-configuration/:configurationId", isLogin, isManager, deleteConfiguration);

export default router;
