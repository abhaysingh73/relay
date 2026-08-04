import express from "express";
const router = express.Router();

import { publishEvent } from "../controllers/events.js";
import { validate } from "../middleware/validation.js";
import { eventSchema } from "../validators/events.js";

router.post("/publish", validate(eventSchema), publishEvent);

export default router;