const { productRepository } = require('../repositories/ProductRepository')
const { orderRepository } = require('../repositories/OrderRepository')
const { orderProductRepository } = require('../repositories/OrderProductRepository')
const { Sequelize, Op } = require('sequelize')
const InternalServerError = require('../errors/InternalServerError')
const Customer = require('../models/CustomerModel')
const NotFoundError = require('../errors/NotFoundError')
const ConflictError = require('../errors/ConflictError')

const createOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    /*
    5 - Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.
    */

    const idProducts = pedido_produtos.map((product) => { return product.produto_id })

    const requiredProducts = await productRepository.findAll({ id: { [Op.in]: idProducts } }, { attributes: ['id', 'valor', 'descricao', 'quantidade_estoque'] })

    if (requiredProducts.length !== idProducts.length) throw new NotFoundError('Um ou mais produto(s) inexistente(s)')

    const productData = pedido_produtos.map((product => {
        let data;
        requiredProducts.forEach(requiredProduct => {
            const { id, descricao, quantidade_estoque, valor } = requiredProduct
            if (id === product.produto_id) {
                if (quantidade_estoque < product.quantidade_produto) {
                    throw new ConflictError(
                        `O produto ${descricao} não possui estoque suficiente. Quantidade solicitada ${product.quantidade_produto}, quantidade em estoque ${quantidade_estoque}`
                    )
                }
                data = { descricao, ...product, valor_produto: valor, }
            }
        })
        return data
    }))

    const totalOrderValue = productData.reduce((accum, current) => {
        accum += current.valor_produto * current.quantidade_produto
        return accum
    }, 0)

    const order = await orderRepository.create({ cliente_id, observacao, valor_total: totalOrderValue })

    if (!order) throw new InternalServerError('Não foi possível cadastrar o pedido')

    const orderProductData = productData.map((product) => {
        return { pedido_id: order.id, ...product }
    })

    const orderProduct = await orderProductRepository.bulkCreate(orderProductData)

    if (!orderProduct) {
        await orderRepository.delete({ id: order.id })
        throw new InternalServerError('Não foi possível cadastrar o pedido')
    }

    orderProduct.forEach(async ({ produto_id, quantidade_produto }) => {
        await productRepository.update(
            {
                quantidade_estoque: Sequelize.literal(`quantidade_estoque - ${quantidade_produto}`)
            },
            { id: produto_id }
        )
    })

    const orderData = await orderRepository.findOne({ id: order.id }, { include: { model: Customer, as: 'cliente' } })

    return res.status(201).json({
        id: orderData.id,
        dados_cliente: {
            cliente: orderData.cliente.nome,
            cpf: orderData.cliente.cpf,
            observacao: orderData.observacao
        },
        itens_pedido: productData,
        valor_total: orderData.valor_total
    })
}

module.exports = {
    createOrder
}