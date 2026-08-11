import { prismaClient } from "../lib/prisma.js";

export const createEvent = async (event) => {
    return await prismaClient.event.create({ data: event });
}

export const fetchOne = async (id) => {
    return await prismaClient.event.findUnique({ where: { id } });
}