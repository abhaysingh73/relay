import Joi from "joi"

export const endpointSchema = Joi.object({
    url: Joi.string()
        .uri()
        .required()
        .messages({
            "string.uri": "url must a valid URI",
            "string.empty": "url must not me empty",
            "any.required": "url is required"
        })
}).required()
    .messages({
        "any.required": "request body is required"
    }).prefs({
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: true
    });