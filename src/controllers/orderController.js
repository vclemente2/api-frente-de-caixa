const { productRepository } = require('../repositories/ProductRepository')
const { orderRepository } = require('../repositories/OrderRepository')
const { orderProductRepository } = require('../repositories/OrderProductRepository')
const { Op } = require('sequelize')
const InternalServerError = require('../errors/InternalServerError')
const Customer = require('../models/CustomerModel')
const NotFoundError = require('../errors/NotFoundError')

const createOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    /*

    3 - Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.

    4 - O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados.

    5 - Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.
    */

    const idProducts = pedido_produtos.map((product) => { return product.produto_id })

    const products = await productRepository.findAll({ id: { [Op.in]: idProducts } }, { attributes: ['id', 'valor', 'descricao', 'quantidade_estoque'] })

    if (products.length !== idProducts.length) throw new NotFoundError('Um ou mais produtos inexistente(s)')

    const productData = pedido_produtos.map((product => {
        let data;
        products.forEach(item => {
            if (item.id === product.produto_id) {
                data = { descricao: item.descricao, ...product, valor_produto: item.valor, }
            }
        })
        return data
    }))

    const totalValue = productData.reduce((accum, current) => {
        accum += current.valor_produto * current.quantidade_produto
        return accum
    }, 0)

    const order = await orderRepository.create({ cliente_id, observacao, valor_total: totalValue })

    if (!order) throw new InternalServerError('Não foi possível cadastrar o pedido')

    const orderProductData = productData.map((product) => {
        return { pedido_id: order.id, ...product }
    })

    const orderProduct = await orderProductRepository.bulkCreate(orderProductData)

    if (!orderProduct) {
        await orderRepository.delete({ id: order.id })
        throw new InternalServerError('Não foi possível cadastrar o pedido')
    }

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