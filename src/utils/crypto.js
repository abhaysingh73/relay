import crypto from "node:crypto";

export const generateKey = (type = "") => {
    let keyPrefix = "";

    if (type === "apiKey") keyPrefix = "relay_";

    return keyPrefix + crypto.randomBytes(32).toString("hex");
}

export const hash = (data) => {
    return crypto.createHash("sha256").update(data).digest("hex");
}