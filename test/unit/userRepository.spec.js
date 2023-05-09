const { UniqueConstraintError, ValidationError, json } = require('sequelize')
const { UserRepository, userRepository } = require('../../src/repositories/UserRepository')
const testConnection = require('../connection/database')
const userMock = require('../mock/user.mock')

describe('create user', () => {
    let userRepository;

    beforeAll(() => userRepository = new UserRepository(testConnection))

    // afterAll(() => userRepository.closeConnection())

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

describe('find one user', () => {
    let userRepository
    let userOne
    let userTwo

    beforeAll(async () => {
        userRepository = new UserRepository(testConnection)
        userOne = await userRepository.create(userMock.valid)
        userTwo = await userRepository.create(userMock.valid_two)
    })

    afterAll(async () => userRepository.delete({}))

    it('Should be able to find a user by Its ID', async () => {
        const user = await userRepository.findOne({ id: userOne.id })

        const { id, ...userNoId } = user

        expect(user).toStrictEqual(userOne)
        expect(userNoId).toStrictEqual(userMock.valid)
    })

    it('Should be able to find a user by Its email', async () => {
        const user = await userRepository.findOne({ email: userOne.email })

        const { id, ...userNoId } = user

        expect(user).toStrictEqual(userOne)
        expect(user).not.toEqual(userTwo)
        expect(userNoId).toStrictEqual(userMock.valid)
    })
})

describe('list users', () => {
    let userRepository
    let userOne
    let userTwo

    beforeAll(async () => {
        userRepository = new UserRepository(testConnection)
        userOne = await userRepository.create(userMock.valid)
        userTwo = await userRepository.create(userMock.valid_two)
    })

    afterAll(async () => userRepository.delete({}))

    it('Should be able to list all users', async () => {
        const users = await userRepository.findAll()

        expect(users).toBeInstanceOf(Array)
        expect(users).toHaveLength(2)
    })
})

describe('update a user', () => {
    let userRepository
    let user

    beforeAll(() => userRepository = new UserRepository(testConnection))
    beforeEach(async () => user = await userRepository.create(userMock.valid))
    afterEach(async () => await userRepository.delete({}))

    afterAll(async () => userRepository.delete({}))

    it('Should be able to update a user - valid payload', async () => {
        const updatedUser = await userRepository.update(userMock.valid_two, { id: user.id })

        expect(updatedUser).toBeInstanceOf(Array)
        expect(updatedUser).toHaveLength(2)
        expect(updatedUser[1][0].dataValues).not.toEqual(user)
        expect(updatedUser[1][0].dataValues).toStrictEqual({
            id: user.id,
            ...userMock.valid_two
        })
    })

    it('Should NOT be able to update more than one user with the same email', async () => {
        const userDois = userMock.valid_two
        await userRepository.create(userDois)
        await expect(userRepository.update(userDois, { id: user.id })).rejects.toBeInstanceOf(UniqueConstraintError)
    })
})

describe('delete a user', () => {
    let userRepository
    let user
    let userDois

    beforeAll(() => userRepository = new UserRepository(testConnection))
    beforeEach(async () => {
        user = await userRepository.create(userMock.valid)
        userDois = await userRepository.create(userMock.valid_two)
    })
    afterEach(async () => userRepository.delete({}))

    it('Should be able to delete a user by Its ID.', async () => {
        const deletedUser = await userRepository.delete({ id: user.id })

        expect(deletedUser).toBe(1)
    })

    it('Should be able to delete a user by Its email.', async () => {
        const deletedUser = await userRepository.delete({ email: user.email })

        expect(deletedUser).toBe(1)
    })

})
