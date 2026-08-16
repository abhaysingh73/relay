import { prismaClient } from "../lib/prisma.js";

export const fetchOne = async (id) => {
    return await prismaClient.event.findUnique({ where: { id } });
}

export const updateEvent = async (id, data) => {
    return await prismaClient.event.update({ where: { id }, data });
}

export const eventTransaction = async (tenantId, eventName, payload) => {
    return await prismaClient.$transaction(async (tx) => {
        const event = await tx.event.create({ data: { tenantId, eventName, payload } });
        const subscriptions = await tx.webhookSubscription.findMany({ where: { eventName } });
        let delivery = [];
        for (let i of subscriptions) {
            delivery.push(await tx.delivery.create({
                data: {
                    tenantId,
                    endpointId: i.endpointId,
                    eventId: event.id,
                    status: "queued",
                    attempts: 0,
                }
            }));
        }
        return {
            eventId: event.id,
            delivery
        }
    });
}