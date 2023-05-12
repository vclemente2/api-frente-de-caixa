const request = require('supertest')
const { UserRepository } = require('../../src/repositories/UserRepository')
const testConnection = require('../connection/database')
const app = require('../../src/server')
const userMock = require('../mock/user.mock')

describe('Create user controller - POST /usuario', () => {
    let userRepository

    beforeAll(() => userRepository = new UserRepository(testConnection))
    afterEach(async () => userRepository.delete({}))

    it('Should be able to create a user - valid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.valid)

        const { nome, email } = userMock.valid
        const user = await userRepository.findOne({ id: response.body.id })

        expect(response.body).toStrictEqual(
            {
                id: expect.any(Number),
                nome,
                email
            }
        )
        expect(response.body).not.toHaveProperty('senha', expect.anything())
        expect(user.senha).toBeDefined()
        expect(userMock.valid.senha).not.toBe(user.senha)
        expect(response.error).toBeFalsy()
    })

    it('Should NOT be able to create more than a user with the same email', async () => {
        await request(app).post('/usuario').send(userMock.valid)
        const response = await request(app).post('/usuario').send(userMock.valid)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(409)
    })

    it('Should NOT be able to create a user without name - invalid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.invalid_noName)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(422)
    })

    it('Should NOT be able to create a user without email - invalid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.invalid_noEmail)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(422)
    })

    it('Should NOT be able to create a user without password - invalid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.invalid_noSenha)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(422)
    })

    it('Should NOT be able to create a user with numbers in the name - invalid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.invalid_nameNumber)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(422)
    })

    it('Should NOT be able to create a user with invalid email format - invalid payload', async () => {
        const response = await request(app).post('/usuario').send(userMock.invalid_emailFormat)

        expect(response.error).not.toBeFalsy()
        expect(response.body).toHaveProperty('mensagem', expect.any(String))
        expect(response.status).toEqual(422)
    })

})

describe('User profile - GET /usuario', () => {
    let userRepository
    let user
    let token

    beforeAll(async () => {
        userRepository = new UserRepository(testConnection)
        user = await request(app).post('/usuario').send(userMock.valid)
        const response = await request(app).post('/login').send({ email: userMock.valid.email, senha: userMock.valid.senha })
        token = response.body.token
    })
    afterAll(async () => userRepository.delete({}))

    it('Should be possible for an authenticated user to be able to list his data', async () => {
        const response = await resquest(app).get('/usuario').header()
    })
})