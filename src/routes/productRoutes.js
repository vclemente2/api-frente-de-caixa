const { Router } = require('express')
const { createProduct, updateProduct, getProduct, getOneProduct } = require('../controllers/productController')
const { validateCategoryExists } = require('../middlewares/categoryValidation')
const { validateProductExists } = require('../middlewares/productValidation')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const productSchema = require('../schema/productSchema')

const routes = Router()

routes.post('/', validateRequisitionBody(productSchema), validateCategoryExists, createProduct)
routes.put('/:id', validateRequisitionBody(productSchema), validateProductExists, validateCategoryExists, updateProduct)
routes.get('/', getProduct)
routes.get('/:id', getOneProduct)


module.exports = routes
