const InternalServerError = require('../errors/InternalServerError');
const { productRepository } = require('../repositories/ProductRepository');

const createProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    //validações via schema
    const product = await productRepository.create({ descricao, quantidade_estoque, valor, categoria_id })

    if (!product) throw new InternalServerError('Não foi possível criar o produto')

    return res.status(201).json(product)
}

const updateProduct = async (req, res) => {

    const product = await productRepository.update(req.body, req.params.id)

    if (!product) throw new InternalServerError('Não foi possível atualizar o produto')

    return res.status(204).send()
}

module.exports = {
    createProduct,
    updateProduct
}
