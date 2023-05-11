const BaseRepository = require('./BaseRepository')
const connection = require('../connection/database')

class OrderRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.pedidos)
    }
}

const orderRepository = new OrderRepository(connection)

module.exports = { orderRepository, OrderRepository }
