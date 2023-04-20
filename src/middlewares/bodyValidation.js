const validateRequisitionBody = validationsSchema => async (req, res, next) => {

    await validationsSchema.validateAsync(req.body)

    for (const element in req.body) {

        const value = req.body[element]

        if (typeof value == 'string') req.body[element] = value.trim()

    }

    next()

}

module.exports = {
    validateRequisitionBody
}