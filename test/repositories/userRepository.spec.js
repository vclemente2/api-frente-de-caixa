const { UserRepository } = require('../../src/repositories/UserRepository')
const testConnection = require('../connection/database')
const bcrypt = require('bcrypt')


describe('create user', () => {
    let userRepositoy;

    beforeAll(() => {
        userRepositoy = new UserRepository(testConnection)
    })

    afterAll(async () => {
        await userRepositoy.delete({})
        return userRepositoy.closeConnection()
    })

    it('Should be able to create a new user', async () => {
        const bodyRequest = {
            'nome': 'Vinicius',
            'email': 'v@v.com',
            'senha': '123456'
        }

        bodyRequest.senha = await bcrypt.hash(bodyRequest.senha, 10)

        const user = await userRepositoy.create(bodyRequest)

        const { senha: _, ...newUser } = user

        expect(newUser).toEqual(
            {
                id: expect.any(Number),
                nome: 'Vinicius',
                email: 'v@v.com'
            })
    })

})