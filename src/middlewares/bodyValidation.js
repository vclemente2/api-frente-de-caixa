const validateRequisitionBody = validationsSchema => async (req, res, next) => {

    req.body = await validationsSchema.validateAsync(req.body)

    next()

}

module.exports = {
    validateRequisitionBody
}