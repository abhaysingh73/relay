import { maxEventQueueAttempts } from "../config/constants.js";
import { eventQueue } from "../queues/events.js";
import { eventTransaction } from "../services/events.js"

export const publishEvent = async (req, res) => {
    const eventDeliveries = await eventTransaction(req.tenantId, req.body.eventName, req.body.payload);

    for (let delivery of eventDeliveries.delivery) {
        await eventQueue.add(
            'delivery',
            { id: delivery.id },
            {
                attempts: maxEventQueueAttempts,
                backoff: {
                    type: "exponential",
                    delay: 5000
                }
            }
        );
    }

    res.status(202).send({
        eventId: eventDeliveries.eventId,
        eventDeliveries: eventDeliveries.delivery.map((d) => { return { id: d.id, status: d.status, createdAt: d.createdAt } }),
    });
}