import Joi from "joi"

export const eventSchema = Joi.object({
    event: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.base": "Event must be a string",
            "string.empty": "Event cannot be empty",
            "string.min": "Event must be atleast 2 characters",
            "any.required": "Event is required"
        }),
    webhookUrl: Joi.string()
        .uri()
        .required()
        .messages({
            "string.uri": "Webhook URL must be a valid URI",
            "string.empty": "Webhook URL cannot be empty",
            "any.required": "Webhook URL is required"
        }),
    payload: Joi.object()
        .min(1)
        .required()
        .messages({
            "object.base": "Payload must be an object",
            "object.min": "Payload must have atleast one key",
            "any.required": "Payload is required"
        })
}).prefs({
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: false
});