import express from 'express';
import stokController from "../controllers/stok.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();




router.get('/', stokController.index);
router.get('/create', stokController.create);
router.post('/store', stokController.store);    

export default router;