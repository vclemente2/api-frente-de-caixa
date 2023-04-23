const { Router } = require('express')
const { createUser, updateUser, userProfile } = require('../controllers/userController')
const { validateUserRequiredData } = require('../middlewares/userValidation')
const { validateRequisitionBody } = require('../middlewares/bodyValidation')
const userSchema = require('../schema/userSchema')

const public = Router()
const private = Router()

public.post('/', validateRequisitionBody(userSchema), validateUserRequiredData, createUser)

private.get('/', userProfile)
private.put('/', validateRequisitionBody(userSchema), validateUserRequiredData, updateUser)

module.exports = {
    private,
    public
}
