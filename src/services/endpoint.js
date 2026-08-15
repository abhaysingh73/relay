import { prismaClient } from "../lib/prisma.js";

export const createEndpoint = async (tenantId, url, encryptedSecret) => {
    return await prismaClient.endpoint.create({ data: { tenantId, url, encryptedSecret } });
}

export const fetchEndpoints = async (tenantId, id) => {
    const select = {
        id: true,
        url: true,
        createdAt: true
    };

    if (id) {
        return await prismaClient.endpoint.findFirst({ where: { id, tenantId }, select });
    } else {
        return await prismaClient.endpoint.findMany({ where: { tenantId }, select });
    }
}

export const deleteEndpoints = async (tenantId, id) => {
    if (id) {
        return await prismaClient.endpoint.delete({ where: { id, tenantId } })
    } else {
        return await prismaClient.endpoint.deleteMany({ where: { tenantId } });
    }
}