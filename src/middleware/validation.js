export const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error: error.details.map((detail) => detail.message)
        })
    }

    req.body = value;
    next();
}