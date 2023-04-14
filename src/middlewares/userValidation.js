const validateUser = (validationsSchema) => async (req, res, next) => {
    try {
        await validationsSchema.validateAsync(req.body);

        next();
    } catch (error) {
        return res.status(400).json({ mensagem: `Os campos ${req.body} são obrigatórios` });
    }
}

module.exports = validateUser;