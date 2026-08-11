import { eventQueue } from "../queues/events.js";
import { createEvent } from "../services/events.js";

export const publishEvent = async (req, res) => {
    const event = await createEvent(req.body);
    eventQueue.add('event', { id:  event.id });
    res.send({
        id: event.id,
        status: event.status,
        createdAt: event.createdAt
    });
}