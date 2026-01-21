import express from 'express';
import UserController from "../controllers/user.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.use(isLogin)

router.get('/', UserController.index);
router.get('/create', UserController.create);
router.post('/store', UserController.store);
router.get('/edit/:id', UserController.edit);
router.post('/update/:id', UserController.update);
router.get('/delete/:id', UserController.delete);

export default router;

