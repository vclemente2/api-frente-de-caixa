const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const { productRepository } = require('../repositories/ProductRepository');
const { deleteFile, uploadFile } = require('../config/storageConfig');
const Order = require('../models/OrderModel');
const { v4: uuidv4 } = require('uuid');

const createProduct = async (req, res) => {

    const product = await productRepository.create(req.body)

    if (!product) throw new InternalServerError('Não foi possível criar o produto')

    return res.status(201).json(product)
}

const updateProduct = async (req, res) => {
    const { file } = req
    const { id } = req.params

    //verificar se o produto existe
    const product = await productRepository.findOne({ id: req.params.id })

    if (!product) throw new BadRequestError('Produto não encontrado')

    //verificar se o produto tem imagem cadastrada, se tiver imagem cadastrada, deletar a imagem antiga
    if (product.produto_imagem) {
        const path = product.produto_imagem.split('/').slice(3).join('/')
        await deleteFile(path)
    }

    // verificar se o produto tem imagem nova, se tiver, fazer upload de imagem no servidor de imagem e atualizar o campo produto_imagem
    if (file) {
        await uploadFile(uuidv4(), file.buffer, file.mimetype)
       
        await productRepository.update({ produto_imagem: file.location }, { id: req.params.id })
    }

    // verificar se o produto novo não tem imagem, e atribuir o valor null ao campo produto_imagem
    if (!file) {
        await productRepository.update({ produto_imagem: null }, { id: req.params.id })
    }
    // atualizar o produto
    const updatedProduct = await productRepository.update(req.body, { id: req.params.id })
    if (!updatedProduct) throw new InternalServerError('Não foi possível atualizar o produto')

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
