const BaseRepository = require('./BaseRepository')
const Category = require('../models/CategoryModel')
const connection = require('../connection/database')

Category.init(connection)

class CategoryRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }
}

const categoryRepository = new CategoryRepository(Category)

module.exports = { categoryRepository, CategoryRepository }
