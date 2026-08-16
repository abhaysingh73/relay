import Joi from "joi"

export const eventSchema = Joi.object({
    eventName: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.base": "Event Name must be a string",
            "string.empty": "Event Name cannot be empty",
            "string.min": "Event Name must be atleast 2 characters",
            "any.required": "Event Name is required"
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