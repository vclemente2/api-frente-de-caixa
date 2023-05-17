const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const { productRepository } = require('../repositories/ProductRepository');
const { deleteFile } = require('../config/storageConfig');
const Order = require('../models/OrderModel');

const createProduct = async (req, res) => {

    const product = await productRepository.create(req.body)

    if (!product) throw new InternalServerError('Não foi possível criar o produto')

    return res.status(201).json(product)
}

const updateProduct = async (req, res) => {

    const product = await productRepository.update(req.body, { id: req.params.id })
    if (!product) throw new InternalServerError('Não foi possível atualizar o produto')

    return res.status(204).send()
}

const getProduct = async (req, res) => {
    const { categoria_id } = req.query;

    if (categoria_id) {
        if (typeof categoria_id === 'object') {
            categoria_id.forEach((categoria) => { if (isNaN(categoria)) throw new BadRequestError('O campo ID deve ser do tipo número') })
        }
        else if (isNaN(categoria_id)) throw new BadRequestError('Informe um ID válido')
    }

    const products = categoria_id ?
        await productRepository.findAll({ categoria_id })
        :
        await productRepository.findAll()

    if (!products) throw new InternalServerError('Não foi possível listar o(s) produto(s)')

    return res.json(products)

}

const getOneProduct = async (req, res) => {
    const { id } = req.params

    const product = await productRepository.findOne({ id })

    if (!product) throw new InternalServerError('Não foi possível buscar o produto')

    return res.json(product)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    const product = await productRepository.findAll({ id }, { include: { model: Order, as: 'pedidos' } })

    if (product[0].pedidos.length) throw new BadRequestError('Não é possível excluir um produto que está vinculado a um pedido')

    if (product.produto_imagem) {
        const path = product.produto_imagem.split('/').pop()
        await deleteFile(path)
    }

    const deletedProduct = await productRepository.delete({ id })

    if (!deletedProduct) throw new InternalServerError('Não foi possível excluir o produto')

    return res.status(204).send()
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getOneProduct,
    deleteProduct
}
