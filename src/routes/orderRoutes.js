const { Router } = require('express')
const { createOrder, listOrders } = require('../controllers/orderController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const orderSchema = require('../schema/orderSchema')
const { validateCustomerExists } = require('../middlewares/customerValidation')

const routes = Router()

routes.post('/', validateRequisitionBody(orderSchema), validateCustomerExists, createOrder)
routes.get('/', listOrders)



module.exports = routes
