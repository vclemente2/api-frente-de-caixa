const BaseRepository = require('./BaseRepository')
const Category = require('../models/CategoryModel')
const connection = require('../connection/database')

Category.init(connection)

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category)
    }
}

module.exports = new CategoryRepository()
