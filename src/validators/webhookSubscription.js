import Joi from "joi";

export const subscription = Joi.object({
    eventName: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.base": "Event name must be a string.",
            "string.empty": "Event name cannot be empty.",
            "string.min": "Event name should be atleast 3 characters.",
            "any.required": "Event name is requried"
        }),
    endpointId: Joi.number()
        .min(1)
        .required()
        .messages({
            "number.base": "Endpoint-Id must be a number.",
            "number.min": "Endpoint-Id should be positive number.",
            "any.required": "Endpoint-Id is requried"
        })
}).required()
    .messages({
        "any.required": "Request body should be valid JSON."
    }).prefs({
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: false,
    });