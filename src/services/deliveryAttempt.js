import { prismaClient } from "../lib/prisma.js";

export const createDeliveryAttempt = async (data) => { 
    return await prismaClient.deliveryAttempt.create({
        data
    });
}