import express from "express";
import DashboardController from "../controllers/dashboard.controller.js";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

router.use(isLogin);

router.get("/", DashboardController.index);

export default router;
