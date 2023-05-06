const { userRepository } = require('../repositories/UserRepository')
const ConflictError = require('../errors/ConflictError')

const validateUserRequiredData = async (req, res, next) => {

    const user = req.user
    const { email } = req.body

    const alreadyRegisteredUser = await userRepository.findOne({ email })

    if (alreadyRegisteredUser) {
        if (!user) throw new ConflictError('Já existe usuário cadastrado com o e-mail informado')
        if (user.email !== alreadyRegisteredUser.email) throw new ConflictError('O e-mail informado já está sendo utilizado por outro usuário.')
    }

    next()

}

module.exports = {
    validateUserRequiredData
}
