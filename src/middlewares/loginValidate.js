const bcrypt = require('bcrypt')
const userRepository = require('../repositories/UserRepository')
const ForbiddenError = require('../errors/ForbiddenError')

const validateUserLogin = async (req, res, next) => {

    const { email, senha } = req.body

    const loggedUser = await userRepository.findByEmail(email)

    if (!loggedUser) throw new ForbiddenError('Usuário e/ou senha inválido(s).')

    const { senha: senhaUsuario, ...user } = loggedUser

    const validPassword = await bcrypt.compare(senha, senhaUsuario)

    if (!validPassword) throw new ForbiddenError('Usuário e/ou senha inválido(s).');

    req.user = user

    next()
}

module.exports = {
    validateUserLogin
}