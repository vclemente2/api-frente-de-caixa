const BaseRepository = require('./BaseRepository.js')
const User = require('../models/UserModel.js');
const connection = require('../connection/database.js')

User.init(connection)

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }

    async findByEmail(email) {
        const dbReturn = await this.model.findOne({ where: { email: email } })
        return dbReturn ? dbReturn.toJSON() : null
    }
}

const userRepository = new UserRepository(User)

module.exports = { userRepository, UserRepository }
