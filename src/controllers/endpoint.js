import { createEndpoint, fetchEndpoints, deleteEndpoints } from "../services/endpoint.js";
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

export const fetchEndpointsCon = async (req, res, next) => {
    try {
        const endpoints = await fetchEndpoints(
            req.tenantId,
            req.params.id ? parseInt(req.params.id) : undefined
        );

        return res.status(200).json(endpoints);
    } catch (error) {
        next(error);
    }
};


export const deleteEndpointsCon = async (req, res, next) => {
    try {
        const result = await deleteEndpoints(
            req.tenantId,
            req.params.id ? parseInt(req.params.id) : undefined
        );

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};