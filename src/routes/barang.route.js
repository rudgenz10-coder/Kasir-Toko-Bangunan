import express from 'express';
import barangController from "../controllers/barang.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isLogin, barangController.index);
router.get('/create', isLogin, barangController.create);
router.post('/store', isLogin, barangController.store);
router.get('/edit/:kode', isLogin, barangController.edit);
router.post('/update/:kode', isLogin, barangController.update);
router.get('/delete/:kode', isLogin, barangController.delete);

export default router;