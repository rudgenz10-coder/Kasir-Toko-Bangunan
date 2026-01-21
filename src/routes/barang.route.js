import express from 'express';
import barangController from "../controllers/barang.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.use(isLogin);

router.get('/', barangController.index);
router.get('/create', barangController.create);
router.post('/store', barangController.store);
router.get('/edit/:kode', barangController.edit);
router.post('/update/:kode', barangController.update);
router.get('/delete/:kode', barangController.delete);

export default router;