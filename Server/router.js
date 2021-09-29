import express from "express";
import { postLogin } from "./Api/authApi";
const router = express.Router();

router.get("/home", postLogin);

export default router;
