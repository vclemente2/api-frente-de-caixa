const { CategoryRepository } = require("../../src/repositories/CategoryRepository")

class CategoryRepositoryTest extends CategoryRepository {
    constructor(model) {
        super(model)
    }
    async closeConnection() {
        await this.model.sequelize.close()
    }
}

module.exports = CategoryRepositoryTest
