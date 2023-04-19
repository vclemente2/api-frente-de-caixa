const userRepository = require('../repositories/UserRepository')
const ConflictError = require('../errors/ConflictError')

const validateUserRequiredData = async (req, res, next) => {

    const user = req.user
    const { email } = req.body

    // const loggedUser = await userRepository.findByEmail(email)

    // if (!user) {
    //     if (loggedUser) throw new ConflictError('Já existe usuário cadastrado com o e-mail informado')
    // }

    // if (loggedUser) {
    //     if (user.id !== loggedUser.id) throw new ConflictError('O e-mail informado já está sendo utilizado por outro usuário.')
    // }
    const alreadyRegistered = await userRepository.findByEmail(email)

    if (alreadyRegistered) {
        if (!user) throw new ConflictError('Já existe usuário cadastrado com o e-mail informado')
        if (user.email !== alreadyRegistered.email) throw new ConflictError('O e-mail informado já está sendo utilizado por outro usuário.')
    }

    next()
}

module.exports = {
    validateUserRequiredData
}