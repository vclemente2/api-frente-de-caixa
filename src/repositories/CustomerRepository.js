const BaseRepository = require('./BaseRepository')
const connection = require('../connection/database')

class CustomerRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.clientes)
    }
}

const customerRepository = new CustomerRepository(connection)

module.exports = { customerRepository, CustomerRepository }
