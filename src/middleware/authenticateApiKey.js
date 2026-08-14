import { createHash } from "node:crypto";
import { fetchApiKey } from "../services/apiKeys.js";

const unauthorized = (res) =>
    res.status(401).json({
        error: "Authentication failed."
    });

export const authenticateApiKey = async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (typeof apiKey !== "string" || !apiKey) {
        return unauthorized(res);
    }

    const keyHash = createHash("sha256")
        .update(apiKey)
        .digest("hex");

    try {
        const apiKeyData = await fetchApiKey(keyHash);

        if (!apiKeyData) {
            return unauthorized(res);
        }

        req.tenantId = apiKeyData.tenantId;
        next();
    } catch (err) {
        console.error("Failed to authenticate API KEY", err);

        return res.status(500).json({
            error: "Internal server error."
        });
    }
}