const jwt = require('jsonwebtoken')
const { userRepository } = require('../repositories/UserRepository')
const UnauthorizedError = require('../errors/UnauthorizedError')

const verifyLoggedUser = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) throw new UnauthorizedError('Para acessar este recurso um token de autenticação válido deve ser enviado.')

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_HASH)

    const loggedUser = await userRepository.findOne({ id })

    if (!loggedUser) throw new UnauthorizedError('Acesso não autorizado')

    const { senha, ...user } = loggedUser

    req.user = user

    next()

}

module.exports = {
    verifyLoggedUser
}
