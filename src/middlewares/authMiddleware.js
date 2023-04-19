const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/UserRepository')


const verifyLoggedUser = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })

    const token = authorization.split(' ')[1]

    try {

        const { id } = jwt.verify(token, process.env.JWT_HASH)

        const loggedUser = await userRepository.findOne(id)

        if (!loggedUser) return res.status(401).json({ mensagem: 'Acesso não autorizado' })

        const { senha, ...user } = loggedUser

        req.user = user

        next()
         
    } catch (error) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado' })
    }
}

module.exports = {
    verifyLoggedUser
}