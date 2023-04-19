const BaseRepository = require('./BaseRepository')

class CategoryRepository extends BaseRepository {
    constructor() {
        super('categorias')
    }
}

module.exports = new CategoryRepository()
