const { Router } = require('express')
const { createProduct, updateProduct, getProduct } = require('../controllers/productController')
const { validateCategoryExists } = require('../middlewares/categoryValidation')
const { validateProductExists } = require('../middlewares/productValidation')

const routes = Router()

routes.post('/', validateCategoryExists, createProduct)
routes.put('/:id', validateProductExists, validateCategoryExists, updateProduct)
routes.get('/', getProduct)

module.exports = routes
