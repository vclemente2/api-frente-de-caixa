const { Router } = require('express')
const { createCustomer } = require('../controllers/customerController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const customerSchema = require('../schema/customerSchema')

const routes = Router()

routes.post('/', validateRequisitionBody(customerSchema), createCustomer)

module.exports = routes
