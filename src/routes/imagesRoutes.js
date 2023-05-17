const { Router } = require('express')
const { imageUploadController, imageGetController } = require('../controllers/imageController')
const multer = require('../config/multer')

const routes = Router()

routes.post('/upload', multer.single('arquivo'), imageUploadController)
routes.get('/', imageGetController)

module.exports = routes