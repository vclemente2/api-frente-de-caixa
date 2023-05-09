const { Router } = require('express')
const { createUser, updateUser, userProfile } = require('../controllers/userController')
const { validateUserRequiredData } = require('../middlewares/userValidation')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const userSchema = require('../schema/userSchema')

const publicRoute = Router()
const privateRoute = Router()

publicRoute.post('/', validateRequisitionBody(userSchema), validateUserRequiredData, createUser)

privateRoute.get('/', userProfile)
privateRoute.put('/', validateRequisitionBody(userSchema), validateUserRequiredData, updateUser)

module.exports = {
    privateRoute,
    publicRoute
}
