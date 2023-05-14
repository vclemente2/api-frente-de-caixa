const { Router } = require('express')
const { createOrder } = require('../controllers/orderController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const orderSchema = require('../schema/orderSchema')
const { validateCustomerExists } = require('../middlewares/customerValidation')

const routes = Router()

routes.post('/', validateRequisitionBody(orderSchema), validateCustomerExists, createOrder)

module.exports = routes
