import express from "express";
import trx from "../controllers/transaksi.controller.js";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLogin, trx.index);
router.get("/create", isLogin, trx.create);
router.post("/store", isLogin, trx.store);
router.get("/detail/:id", isLogin, trx.detail);



export default router;