export const sanitizeBody = (allowedFields = []) => {
    return (req, res, next) => {
        const sanitized = {};

         for (const field of allowedFields) {
            if (req.body.hasOwnProperty(field)) {
                sanitized[field] = req.body[field];
            }
        }

        // reemplaza el body original con la versión validada
        req.body = sanitized;
        next();
    };
};