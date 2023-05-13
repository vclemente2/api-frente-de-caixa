const { orderRepository } = require('../repositories/OrderRepository')
const { productRepository } = require('../repositories/ProductRepository')

const createOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body


    const productsId = pedido_produtos.map((product) => { return product.produto_id })

    const products = await productRepository.findAll({ productsId, attributes: ['id', 'valor'] })

    // [{id:1, valor:1000}, {id}]

    // return res.json(products)

    // const totalValue = pedido_produtos

    const totalValue = pedido_produtos.reduce(({ produto_id, quantidade_produto }) => {

        let valorTotal = 0;
        products.forEach(produto => {

            if (produto.id === produto_id) {
                valorTotal = produto.valor * quantidade_produto
            }
        });

        return valorTotal

    })

    valorTotal


    // valorTotal = ...

    return res.json(totalValue)



    // const order = await orderRepository.create({ cliente_id, observacao, valor_total: })
}

// "pedido_produtos": [
//     {
//         "produto_id": 1,
//         "quantidade_produto": 10
//     },
//     {
//         "produto_id": 2,
//         "quantidade_produto": 20
//     }
// ]

module.exports = {
    createOrder
}