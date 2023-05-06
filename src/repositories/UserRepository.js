const BaseRepository = require('./BaseRepository.js')
const connection = require('../connection/database.js')

class UserRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.usuarios)
    }
}

const userRepository = new UserRepository(connection)

module.exports = { userRepository, UserRepository }
