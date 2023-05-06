const { productRepository } = require('../repositories/ProductRepository')
const NotFoundError = require('../errors/NotFoundError')
const BadRequestError = require('../errors/BadRequestError')

const validateProductExists = async (req, res, next) => {

    const { id } = req.params

    if (id && isNaN(id)) throw new BadRequestError('Informe um ID válido')

    const product = await productRepository.findOne({ id })

    if (!product) throw new NotFoundError('Produto não encontrado')

    next()
}

module.exports = {
    validateProductExists
}