import express from "express";
const router = express.Router();

import { authenticateApiKey } from "../middleware/authenticateApiKey.js";
import { validate } from "../middleware/validation.js";
import { subscription } from "../validators/webhookSubscription.js";
import { createWebhookSub, deleteWebhookSub } from "../controllers/webhookSub.js";

router.post("/register", authenticateApiKey, validate(subscription), createWebhookSub);

router.delete("/:id", authenticateApiKey, deleteWebhookSub);

export default router;