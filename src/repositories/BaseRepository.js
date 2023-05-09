class BaseRepository {

    constructor(model) {
        this.model = model
    }

    async findAll(where, arrAttributes) {
        const dbReturn = await this.model.findAll({ where, arrAttributes })
        return dbReturn
    }

    async findOne(where, includes = []) {
        const dbReturn = await this.model.findOne({ where, includes })
        return dbReturn ? dbReturn.toJSON() : null
    }

    async create(data) {
        const dbReturn = await this.model.create(data)
        return dbReturn ? dbReturn.toJSON() : null
    }

    async update(data, where) {
        const dbReturn = await this.model.update(data, { where, returning: true })
        return dbReturn
    }

    async delete(where) {
        const dbReturn = await this.model.destroy({ where })
        return dbReturn
    }

    async closeConnection() {
        await this.model.sequelize.close()
    }
}

module.exports = BaseRepository
