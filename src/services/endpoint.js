import { prismaClient } from "../lib/prisma.js";

export const createEndpoint = async (tenantId, url, encryptedSecret) => {
    return await prismaClient.endpoint.create({ data: { tenantId, url, encryptedSecret } });
}