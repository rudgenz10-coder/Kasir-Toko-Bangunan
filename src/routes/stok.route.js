import express from 'express';
import stokController from "../controllers/stok.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isLogin, stokController.index);
router.get('/create', isLogin, stokController.create);
router.post('/store', isLogin, stokController.store);    

export default router;