import { maxEventQueueAttempts } from "../config/constants.js";
import { eventQueue } from "../queues/events.js";
import { createEvent } from "../services/events.js";

export const publishEvent = async (req, res) => {
    const event = await createEvent(req.body);
    eventQueue.add(
        'event',
        { id: event.id },
        {
            attempts: maxEventQueueAttempts,
            backoff: {
                type: "exponential",
                delay: 5000
            }
        }
    );
    res.status(202).send({
        id: event.id,
        status: event.status,
        createdAt: event.createdAt
    });
}