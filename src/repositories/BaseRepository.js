const connection = require('../connection/database')

class BaseRepository {

    constructor(table) {
        this.table = table
    }

    async findAll() {
        return await connection(this.table)
    }
    
    async findOne(id) {
        return await connection(this.table).where({ id }).first()
    }
    async create(data, infoArray) {
        return await connection(this.table).insert(data).returning(infoArray)
    }
    async update(data, id) {
        return await connection(this.table).where('id', id).update(data).returning('*')
    }
    async delete(id) {
        return await connection(this.table).where({ id })
    }
}

module.exports = BaseRepository