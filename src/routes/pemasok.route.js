import pemasokController from "../controllers/pemasok.controller.js";
import express from "express";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

router.use(isLogin);

router.get('/', pemasokController.index);
router.get('/create', pemasokController.create);
router.post('/store', pemasokController.store);
router.get('/edit/:id', pemasokController.edit);
router.post('/update/:id', pemasokController.update);
router.get('/delete/:id', pemasokController.delete);

export default router;