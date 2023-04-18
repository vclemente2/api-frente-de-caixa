const { Router } = require('express')
const { createUser, updateUser, userProfile } = require('../controllers/userController')
const userSchema = require('../schema/userSchema')
const loginSchema = require('../schema/loginSchema')
const { validateUserRequiredData } = require('../middlewares/userValidation')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const { validateUserLogin } = require('../middlewares/loginValidate')
const { userLogin } = require('../controllers/authController')
const { verifyLoggedUser } = require('../middlewares/authMiddleware')

const routes = Router()

routes.post('/usuario', validateRequisitionBody(userSchema), validateUserRequiredData, createUser)
routes.post('/login', validateRequisitionBody(loginSchema), validateUserLogin, userLogin)

routes.use(verifyLoggedUser)

routes.get('/usuario', userProfile)
routes.put('/usuario', validateRequisitionBody(userSchema), validateUserRequiredData, updateUser)


module.exports = routes