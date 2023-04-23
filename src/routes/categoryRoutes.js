const { Router } = require('express')
const { listCategory } = require('../controllers/categoryController')

const routes = Router()

routes.get('/', listCategory)

module.exports = routes
