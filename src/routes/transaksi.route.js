import express from "express";
import trx from "../controllers/transaksi.controller.js";
import { isLogin } from "../middleware/auth.js";

const router = express.Router();

router.use(isLogin);

router.get("/", trx.index);
router.get("/create", trx.create);
router.post("/store", trx.store);
router.get("/detail/:id", trx.detail);



export default router;