const BaseRepository = require('./BaseRepository')
const connection = require('../connection/database')

class ProductRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.produtos)
    }
}

const productRepository = new ProductRepository(connection)

module.exports = { productRepository, ProductRepository }
