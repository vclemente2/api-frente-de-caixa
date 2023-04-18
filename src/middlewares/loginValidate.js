const bcrypt = require('bcrypt')
const userRepository = require('../repositories/UserRepository')

const validateUserLogin = async (req, res, next) => {

    const { email, senha } = req.body

    try {

        const loggedUser = await userRepository.findByEmail(email)

        if(!loggedUser) return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })

        const { senha: senhaUsuario, ...user } = loggedUser

        const validPassword = await bcrypt.compare(senha, senhaUsuario)

        if (!validPassword) return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })

        req.user = user

        next()
        
    } catch (error) {
        return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }
}

module.exports = {
    validateUserLogin
}