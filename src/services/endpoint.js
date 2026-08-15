import { prismaClient } from "../lib/prisma.js";

export const createEndpoint = async (tenantId, url, secret) => {
    return await prismaClient.endpoint.create({ data: { tenantId, url, secret } });
}