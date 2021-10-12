import express from "express";
import { getChickenRanking } from "../Api/eventApi";

const router = express.Router();

router.get("/getChickenEvent", getChickenRanking);

export default router;
