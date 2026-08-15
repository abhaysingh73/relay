import crypto from "node:crypto";

export const generateKey = (type = "") => {
    let keyPrefix = "";

    if (type === "apiKey") keyPrefix = "relay_";

    return keyPrefix + crypto.randomBytes(32).toString("hex");
}

export const hash = (data) => {
    return crypto.createHash("sha256").update(data).digest("hex");
}

export const encrypt = (secret) => {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encrpyted = Buffer.concat([
        cipher.update(secret, "utf-8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return [iv.toString("hex"),
    encrpyted.toString("hex"),
    authTag.toString("hex")
    ].join(":");
}

export const decrypt = (encryptedSecret) => {
    const [ivHex, encryptedHex, authTagHex] = encryptedSecret.split(":");

    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ]);

    return decrypted.toString("utf-8");
}