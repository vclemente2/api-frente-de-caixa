const { Router } = require('express')
const { userLogin } = require('../controllers/authController')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const loginSchema = require('../schema/loginSchema')

const routes = Router()

routes.post('/', validateRequisitionBody(loginSchema), userLogin)

module.exports = routes
