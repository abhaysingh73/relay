import { prismaClient } from "../lib/prisma.js";

export const createTenant = async (name) => {
    return await prismaClient.tenant.create({ data: { name }})
}