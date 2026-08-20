import { prismaClient } from "../lib/prisma.js";

export const fetchDelivery = (id) => {
    return prismaClient.delivery.findUnique({
        where: { id },
        include: {
            endpoint: true,
            event: true
        }
    });
}

export const updateDeliveryStatus = (id, status) => {
    return prismaClient.delivery.update({ where: { id }, data: { status } });
}

export const fetchDeliveries = async () => {
    return await prismaClient.delivery.findMany({
        include: {
            endpoint: {
                select: {
                    id: true,
                    url: true,
                    createdAt: true
                }
            },
            event: {
                select: {
                    id: true,
                    eventName: true,
                    payload: true,
                    createdAt: true
                }
            },
            tenant: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}