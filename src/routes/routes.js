const { Router } = require('express')

const { verifyLoggedUser } = require('../middlewares/authMiddleware')

const userRoutes = require('./userRoutes')
const categoryRoutes = require('./categoryRoutes')
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const customerRoutes = require('./customerRoutes')
const orderRoutes = require('./orderRoutes')
const imagesRoutes = require('./imagesRoutes')

const routes = Router()

routes.use('/categoria', categoryRoutes)
routes.use('/usuario', userRoutes.publicRoute)
routes.use('/login', authRoutes)

routes.use(verifyLoggedUser)

routes.use('/usuario', userRoutes.privateRoute)
routes.use('/produto', productRoutes)
routes.use('/cliente', customerRoutes)
routes.use('/pedido', orderRoutes)
routes.use('/arquivo', imagesRoutes)


module.exports = routes
