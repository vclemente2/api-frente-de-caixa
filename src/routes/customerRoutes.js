const { Router } = require('express')
const { createCustomer } = require('../controllers/customerController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const customerSchema = require('../schema/customerSchema')
const { verifyUniqueEmail, verifyUniqueCpf } = require('../middlewares/customerValidation')

const routes = Router()

routes.post('/', validateRequisitionBody(customerSchema), verifyUniqueEmail, verifyUniqueCpf, createCustomer)

module.exports = routes
