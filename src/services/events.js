import { prismaClient } from "../lib/prisma.js";

export const createEvent = async (event) => {
    return await prismaClient.event.create({ data: event });
}