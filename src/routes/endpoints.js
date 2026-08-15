import express from "express";
import { registerEnpoint, fetchEndpointsCon, deleteEndpointsCon } from "../controllers/endpoint.js";
import { authenticateApiKey } from "../middleware/authenticateApiKey.js";
import { validate } from "../middleware/validation.js";
import { endpointSchema } from "../validators/endpoint.js";
const router = express.Router();

router.get("/", authenticateApiKey, fetchEndpointsCon);
router.get("/:id", authenticateApiKey, fetchEndpointsCon);

router.post("/register", authenticateApiKey, validate(endpointSchema), registerEnpoint);

router.delete("/", authenticateApiKey, deleteEndpointsCon);
router.delete("/:id", authenticateApiKey, deleteEndpointsCon);

export default router;