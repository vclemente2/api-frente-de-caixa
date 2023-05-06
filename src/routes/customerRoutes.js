const { Router } = require('express')
const { createCustomer, updateCustomer, listCostumers, customerProfile } = require('../controllers/customerController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const customerSchema = require('../schema/customerSchema')
const { verifyUniqueEmail, verifyUniqueCpf, validateCustomerExists } = require('../middlewares/customerValidation')

const routes = Router()

routes.post('/', validateRequisitionBody(customerSchema), verifyUniqueEmail, verifyUniqueCpf, createCustomer)
routes.put('/:id', validateRequisitionBody(customerSchema), validateCustomerExists, verifyUniqueEmail, verifyUniqueCpf, updateCustomer)
routes.get('/', listCostumers)
routes.get('/:id', validateCustomerExists, customerProfile)

module.exports = routes