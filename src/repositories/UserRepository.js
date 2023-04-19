const BaseRepository = require('./BaseRepository.js')
const connection = require('../connection/database.js')

class UserRepository extends BaseRepository {
    constructor() {
        super('usuarios')
    }

    async findByEmail(email) {
        return await connection(this.table).where({ email }).first()
    }
}

module.exports = new UserRepository()