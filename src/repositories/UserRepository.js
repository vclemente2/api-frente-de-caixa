const BaseRepository = require('./BaseRepository.js')
const connection = require('../connection/database.js')

class UserRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.usuarios)
    }

    async findByEmail(email) {
        const dbReturn = await this.model.findOne({ where: { email: email } })
        return dbReturn ? dbReturn.toJSON() : null
    }
}

const userRepository = new UserRepository(connection)

module.exports = { userRepository, UserRepository }
