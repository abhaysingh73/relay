import { prismaClient } from "../lib/prisma.js"

export const createWebhookSubscription = async (eventName, endpointId) => {
    return await prismaClient.webhookSubscription.create({ data: { eventName, endpointId } });
}

export const deleteWebhookSubscription = async (id) => {
    return await prismaClient.webhookSubscription.delete({ where: { id } });
}