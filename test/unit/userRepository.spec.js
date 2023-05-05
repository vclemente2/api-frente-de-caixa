const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserRepository } = require('../../src/repositories/UserRepository')
const testConnection = require('../connection/database')
const userMock = require('../mock/user.mock')

describe('create user', () => {
    let userRepository;

    beforeAll(() => userRepository = new UserRepository(testConnection))

    afterAll(() => userRepository.closeConnection())

    afterEach(async () => userRepository.delete({}))

    it('Should be able to create a new user - valid payload', async () => {

        const data = userMock.valid

        const user = await userRepository.create(data)

        expect(user).toHaveProperty('id', expect.any(Number))
        expect(user).toStrictEqual(
            {
                id: expect.any(Number),
                nome: userMock.valid.nome,
                email: userMock.valid.email,
                senha: userMock.valid.senha
            })
    })

    it('Should NOT be able to create more than one user with the same email', async () => {

        const data = userMock.valid

        await userRepository.create(data)

        await expect(userRepository.create(data)).rejects.toBeInstanceOf(UniqueConstraintError)

    })

    it('Should NOT be able to create a user without email - invalid payload', async () => {

        const data = userMock.invalid_noEmail

        return expect(userRepository.create(data)).rejects.toBeInstanceOf(ValidationError)

    })

    it('Should NOT be able to create a user without name - invalid payload', async () => {

        const data = userMock.invalid_noName

        return expect(userRepository.create(data)).rejects.toBeInstanceOf(ValidationError)

    })

    it('Should NOT be able to create a user without password - invalid payload', async () => {

        const data = userMock.invalid_noSenha

        return expect(userRepository.create(data)).rejects.toBeInstanceOf(ValidationError)

    })
})