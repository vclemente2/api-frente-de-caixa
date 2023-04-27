const { Router } = require('express')
const { createProduct } = require('../controllers/productController')
const { validateCategoryExists } = require('../middlewares/categoryValidation')

const routes = Router()

routes.post('/', validateCategoryExists, createProduct)

module.exports = routes
