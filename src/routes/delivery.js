import express from "express";
import { getDeliveries, getDeliveryHistory } from "../controllers/delivery.js";
import { authenticateApiKey } from "../middleware/authenticateApiKey.js";
const router = express.Router();

router.get("/", authenticateApiKey, getDeliveries);
router.get("/:id", authenticateApiKey, getDeliveryHistory);

export default router;