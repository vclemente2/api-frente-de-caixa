const { Router } = require('express')
const { verifyLoggedUser } = require('../middlewares/authMiddleware')
const userRoutes = require('./userRoutes')
const categoryRoutes = require('./categoryRoutes')
const authRoutes = require('./authRoutes')

const routes = Router()

routes.use('/categoria', categoryRoutes)
routes.use('/usuario', userRoutes.public)
routes.use('/login', authRoutes)

routes.use(verifyLoggedUser)

routes.use('/usuario', userRoutes.private)

module.exports = routes
