import express from 'express';
import UserController from "../controllers/user.controller.js";
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isLogin, UserController.index);
router.get('/create', isLogin, UserController.create);
router.post('/store', isLogin, UserController.store);
router.get('/edit/:id', isLogin, UserController.edit);
router.post('/update/:id', isLogin, UserController.update);
router.get('/delete/:id', isLogin, UserController.delete);

export default router;

