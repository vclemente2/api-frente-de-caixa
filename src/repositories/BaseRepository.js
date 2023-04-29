class BaseRepository {

    constructor(model) {
        this.model = model
    }

    async findAll(where, arrAtributes) {
        const dbReturn = await this.model.findAll({
            where,
            arrAtributes
        })
        return dbReturn
    }

    async findOne(id) {
        const dbReturn = await this.model.findOne({ where: { id: id } })
        return dbReturn ? dbReturn.toJSON() : null
    }
    async create(data) {
        const dbReturn = await this.model.create(data)
        return dbReturn ? dbReturn.toJSON() : null
    }
    async update(data, id) {
        const dbReturn = await this.model.update(data, { where: { id: id } })
        return dbReturn
    }
    async delete(id) {
        const dbReturn = await this.model.delete({ where: { id: id } })
        return dbReturn
    }
}

module.exports = BaseRepository
