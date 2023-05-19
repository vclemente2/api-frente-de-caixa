const { uploadFile, getFile } = require('../config/storageConfig')
const InternalServerError = require('../errors/InternalServerError')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const { v4: uuidv4 } = require('uuid')


const imageUploadController = async (req, res) => {

    const { file } = req

    if (!file) throw new BadRequestError('Campo imagem deve ser preenchido')
    if (file.mimetype !== 'image/jpg' && 
        file.mimetype !== 'image/png' && 
        file.mimetype !== 'image/jpeg' && 
        file.mimetype !== 'image/webp' && 
        file.mimetype !== 'image/svg') 
        throw new BadRequestError('Formato de arquivo inválido')

    const ImageFile = await uploadFile(uuidv4(), file.buffer, file.mimetype)

    if (!ImageFile) throw new InternalServerError('Não foi possivel salvar imagem')

    return res.status(201).json(ImageFile)
}

const imageGetController = async (req, res) => {
    const ImageFile = await getFile()

    if (!ImageFile) throw new NotFoundError('Não foi possivel obter imagem')

    return res.status(200).json(ImageFile)
}

module.exports = {
    imageUploadController,
    imageGetController
}