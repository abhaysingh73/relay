import express from "express";
const router = express.Router();

import { publishEvent } from "../controllers/events.js";

router.post("/publish", publishEvent);

export default router;