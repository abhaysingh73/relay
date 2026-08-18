import { createWebhookSubscription, deleteWebhookSubscription } from "../services/webhookSubscription.js"

export const createWebhookSub = async (req, res) => {
    const sub = await createWebhookSubscription(req.tenantId ,req.body.eventName, req.body.endpointId);
    return res.status(200)
        .json({
            id: sub.id,
            eventName: sub.eventName,
            createdAt: sub.createdAt
        });
}

export const deleteWebhookSub = async (req, res) => {
    const sub = await deleteWebhookSubscription(req.tenantId, parseInt(req.params.id));
    return res.status(200).json(sub);
}