import express from "express";
import { registerEnpoint } from "../controllers/endpoint.js";
import { authenticateApiKey } from "../middleware/authenticateApiKey.js";
import { validate } from "../middleware/validation.js";
import { endpointSchema } from "../validators/endpoint.js";
const router = express.Router();

router.post("/register", authenticateApiKey, validate(endpointSchema), registerEnpoint);

export default router;