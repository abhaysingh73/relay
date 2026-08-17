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