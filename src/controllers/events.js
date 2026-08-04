import { createEvent } from "../services/events.js";

export const publishEvent = async (req, res) => {
    console.log('request body', JSON.stringify(req.body));
    //validate request
    const event = await createEvent(req.body);
    res.send({
        id: event.id,
        status: event.status,
        createdAt: event.createdAt
    });
}