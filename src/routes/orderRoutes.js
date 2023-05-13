const { Router } = require('express')
const { createOrder } = require('../controllers/orderController')

const routes = Router()

routes.post('/', createOrder)

module.exports = routes
