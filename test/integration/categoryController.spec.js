const request = require('supertest')
const app = require('../../src/server')
const { CategoryRepository } = require('../../src/repositories/CategoryRepository')
const testConnection = require('../connection/database')

describe('List categories controller - GET /categoria', () => {
    let categoryRepository

    beforeAll(() => categoryRepository = new CategoryRepository(testConnection))

    it('Should be able to list all categories', async () => {
        const response = await request(app)
            .get('/categoria')


        expect(response.body.map(category => {
            const { descricao } = category
            return { descricao }
        }))
            .toStrictEqual(expect.arrayContaining(require('../../src/data/categories')))

        expect(response.body.length).toStrictEqual(require('../../src/data/categories').length)

        expect(response.status).toEqual(200)
    })
})