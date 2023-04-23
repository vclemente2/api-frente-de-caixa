const { Router } = require('express')
const { createUser, updateUser, userProfile } = require('../controllers/userController')
const { userLogin } = require('../controllers/authController')
const { listCategory } = require('../controllers/categoryController')
const { validateUserRequiredData } = require('../middlewares/userValidation')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const { verifyLoggedUser } = require('../middlewares/authMiddleware')
const userSchema = require('../schema/userSchema')
const loginSchema = require('../schema/loginSchema')

const routes = Router()

routes.get('/categoria', listCategory)
routes.post('/usuario', validateRequisitionBody(userSchema), validateUserRequiredData, createUser)
routes.post('/login', validateRequisitionBody(loginSchema), userLogin)

routes.use(verifyLoggedUser)

routes.get('/usuario', userProfile)
routes.put('/usuario', validateRequisitionBody(userSchema), validateUserRequiredData, updateUser)

module.exports = routes
