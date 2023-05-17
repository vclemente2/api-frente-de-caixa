const BaseRepository = require('./BaseRepository')
const connection = require('../connection/database')

class OrderProductRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.pedido_produtos)
    }
}

const orderProductRepository = new OrderProductRepository(connection)

module.exports = { orderProductRepository, OrderProductRepository }
