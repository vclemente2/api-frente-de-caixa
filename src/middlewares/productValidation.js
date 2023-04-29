const { productRepository } = require('../repositories/ProductRepository')
const NotFoundError = require('../errors/NotFoundError')

const validateProductExists = async (req, res, next) => {
    const { id } = req.params

    const product = await productRepository.findOne({ id })

    if (!product) throw new NotFoundError('Produto não encontrado')

    next()
}

module.exports = {
    validateProductExists
}