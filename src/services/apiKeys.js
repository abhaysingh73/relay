import { prismaClient } from "../lib/prisma.js"

export const fetchApiKey = async (keyHash) => {
    return await prismaClient.apiKey.findUnique({
        where: {
            keyHash,
            revokedAt: null
        }
    });
}

export const createApiKey = async (tenantId, keyHash) => {
    return await prismaClient.apiKey.create({
        data: { tenantId, keyHash }
    });
}