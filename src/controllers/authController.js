const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRepository = require('../repositories/UserRepository')
const ForbiddenError = require('../errors/ForbiddenError')

const userLogin = async (req, res) => {

    const { email, senha } = req.body

    const loggedUser = await userRepository.findByEmail(email)

    if (!loggedUser) throw new ForbiddenError('Usuário e/ou senha inválido(s).')

    const { senha: senhaUsuario, ...user } = loggedUser

    const validPassword = await bcrypt.compare(senha, senhaUsuario)

    if (!validPassword) throw new ForbiddenError('Usuário e/ou senha inválido(s).')

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_HASH,
        { expiresIn: '8h' }
    )

    return res.json({ ...user, token })

}

module.exports = {
    userLogin
}
