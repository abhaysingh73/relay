import express from "express";
import { getDeliveries } from "../controllers/delivery.js";
import { authenticateApiKey } from "../middleware/authenticateApiKey.js";
const router = express.Router();

router.get("/", authenticateApiKey, getDeliveries);

export default router;