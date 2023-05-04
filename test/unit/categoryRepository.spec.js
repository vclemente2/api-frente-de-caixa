const { CategoryRepository } = require('../../src/repositories/CategoryRepository')
const testConnection = require('../connection/database')

describe('List categories', () => {
    let categoryRepository

    beforeAll(() => {
        categoryRepository = new CategoryRepository(testConnection)
    })

    afterAll(async () => {
        return categoryRepository.closeConnection()
    })

    it('Should be able to list all categories', async () => {
        const categories = await categoryRepository.findAll()

        expect(categories).toEqual(expect.any(Array))
        expect(categories.length).toBeGreaterThan(0)
    })
})
