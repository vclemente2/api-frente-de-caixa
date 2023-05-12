require('../connection/database')
const Customer = require('../../src/models/CustomerModel')
const Product = require('../../src/models/ProductModel')
const Category = require('../../src/models/CategoryModel')
const Order = require('../../src/models/OrderModel')
const customerMock = require('../mock/customer.mock')

describe('Association tests', () => {
    afterAll(async () => {
        await Customer.destroy({ where: {} })
        await Order.destroy({ where: {} })
        await Product.destroy({ where: {} })
    })

    it('should associate users with orders', async () => {
        const customer = await Customer.create(customerMock.valid)
        const order = await Order.create({ cliente_id: customer.id, observacao: 'pending', valor_total: 50000 })

        await customer.addPedido(order)

        const orders = await customer.getPedidos()
        expect(orders.length).toBe(1)
        expect(orders[0].observacao).toBe('pending')

        const owner = await orders[0].getCliente()
        expect(owner.nome).toBe(customerMock.valid.nome)
    })

    it('should associate categories with products', async () => {
        const category = await Category.findByPk(1)
        const product = await Product.create({ descricao: 'Smartphone', quantidade_estoque: 10, valor: 99999, categoria_id: 1 })

        await category.addProdutos(product)

        const products = await category.getProdutos()
        expect(products.length).toBe(1)
        expect(products[0].descricao).toBe('Smartphone')

        const categoryOfProduct = await products[0].getCategoria()
        expect(categoryOfProduct.descricao).toBe('Informática')
    })
})
