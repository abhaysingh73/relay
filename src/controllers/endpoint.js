import { createEndpoint } from "../services/endpoint.js";
import { encrypt, generateKey } from "../utils/crypto.js"

export const registerEnpoint = async (req, res) => {
    const secret = generateKey();
    const ecnryptedSecret = encrypt(secret);
    const endpointData = await createEndpoint(req.tenantId, req.body.url, ecnryptedSecret);
    return res.status(200)
        .json({
            id: endpointData.id,
            url: endpointData.url,
            secret,
            createdAt: new Date().toISOString()
        });
}