import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;