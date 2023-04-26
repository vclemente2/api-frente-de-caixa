const BaseRepository = require('./BaseRepository')
const connection = require('../connection/database')

class CategoryRepository extends BaseRepository {
    constructor(connection) {
        super(connection.models.categorias)
    }
}

const categoryRepository = new CategoryRepository(connection)

module.exports = { categoryRepository, CategoryRepository }
