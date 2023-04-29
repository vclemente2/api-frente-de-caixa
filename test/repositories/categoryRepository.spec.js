const Category = require('../../src/models/CategoryModel')
const CategoryRepository = require('../../src/repositories/CategoryRepository')
const testConnection = require('../connection/database')

describe('List categories', () => {
    let categoryRepository

    beforeAll(() => {
        Category.init(testConnection)
        categoryRepository = new CategoryRepository(Category)
    })

    afterAll(async () => {
        await categoryRepository.closeConnection()
    })

    it('Should be able to list all categories', async () => {
        const categories = await categoryRepository.findAll()

        expect(categories).toEqual(expect.any(Array))
        expect(categories.length).toBeGreaterThan(0)
    })
})
