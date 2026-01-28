import pemasokController from "../controllers/pemasok.controller.js";
import express from "express";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

router.get('/',isLogin, pemasokController.index);
router.get('/create', isLogin, pemasokController.create);
router.post('/store', isLogin, pemasokController.store);
router.get('/edit/:id', isLogin, pemasokController.edit);
router.post('/update/:id', isLogin, pemasokController.update);
router.get('/delete/:id', isLogin, pemasokController.delete);

export default router;