import { prismaClient } from "../lib/prisma.js"

export const createWebhookSubscription = async (tenantId, eventName, endpointId) => {
    const endpoint = await prismaClient.endpoint.findFirst({ where: { tenantId, endpointId } });
    if (!endpoint) {
        throw new Error("Endpoint not found");
    }
    return await prismaClient.webhookSubscription.create({ data: { eventName, endpointId } });
}

export const deleteWebhookSubscription = async (tenantId, id) => {
    const subscription = await prismaClient.subscription.findFirst({
        where: {
            id,
            endpoint: {
                tenantId
            }
        }
    });
    if (!subscription) {
        throw new Error("Subscription not found");
    }
    return await prismaClient.webhookSubscription.delete({ where: { id } });
}