const bcrypt = require('bcrypt')
const userRepository = require('../repositories/UserRepository')
const InternalServerError = require('../errors/InternalServerError')

const createUser = async (req, res) => {

    const { nome, email, senha } = req.body

    const encryptedPassword = await bcrypt.hash(senha, 10)

    const user = await userRepository.create({
        nome,
        email,
        senha: encryptedPassword
    }, ['id', 'nome', 'email'])


    if (!user) throw new InternalServerError('O usuário não foi cadastrado.')

    return res.status(201).json(user[0])

}

const userProfile = (req, res) => {
    return res.json(req.user)
}

const updateUser = async (req, res) => {

    const { nome, email, senha } = req.body

    const encryptedPassword = await bcrypt.hash(senha, 10)

    await userRepository.update({ nome, email, senha: encryptedPassword }, req.user.id)

    return res.status(204).json()

}


module.exports = {
    createUser,
    userProfile,
    updateUser
}