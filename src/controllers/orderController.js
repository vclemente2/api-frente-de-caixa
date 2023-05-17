require('dotenv').config()
const { productRepository } = require('../repositories/ProductRepository')
const { orderRepository } = require('../repositories/OrderRepository')
const { orderProductRepository } = require('../repositories/OrderProductRepository')
const { Sequelize, Op } = require('sequelize')
const transporter = require('../config/mailConfig')
const generateStringHtml = require('../utils/htmlCompiler')
const InternalServerError = require('../errors/InternalServerError')
const Customer = require('../models/CustomerModel')
const NotFoundError = require('../errors/NotFoundError')
const ConflictError = require('../errors/ConflictError')

const createOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

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

    const orderResponse = {
        id: orderData.id,
        dados_cliente: {
            cliente: orderData.cliente.nome,
            cpf: orderData.cliente.cpf,
        },
        itens_pedido: productData,
        valor_total: orderData.valor_total,
        observacao: orderData.observacao
    }

    const mailContent = await generateStringHtml('./src/templates/OrderSuccessfullyCompleted.html', {
        customerName: orderResponse.dados_cliente.cliente,
        total: (orderResponse.valor_total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        tableData: productData
            .map((product) => {
                return `
                    <tr>
                        <td>${product.descricao}</td>
                        <td>${product.quantidade_produto}</td>
                        <td>${(product.valor_produto / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td>${((product.quantidade_produto * product.valor_produto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                `;
            })
            .join(''),
    });

    transporter.sendMail({
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
        to: `${orderResponse.dados_cliente.cliente} <${orderData.cliente.email}>`,
        subject: `${orderResponse.dados_cliente.cliente}, Seu Pedido Foi Concluído!`,
        html: mailContent,
    });


    return res.status(201).json(orderResponse)
}

const listOrders = async (req, res) => {
    const { cliente_id } = req.query

    if (cliente_id) {
        if (typeof cliente_id === 'object') {
            cliente_id.forEach((cliente) => { if (isNaN(cliente)) throw new BadRequestError('O campo ID deve ser do tipo número') })
        }

        const orders = await orderRepository.findAll({ cliente_id }, { include: { model: Customer, as: 'cliente' } })

        if (!orders.length) throw new NotFoundError('Nenhum pedido encontrado')

        return res.status(200).json(orders)
    }

    const orders = await orderRepository.findAll({}, { include: { model: Customer, as: 'cliente' } })

    if (!orders.length) throw new NotFoundError('Nenhum pedido encontrado')

    return res.status(200).json(orders)

}



module.exports = {
    createOrder,
    listOrders
}