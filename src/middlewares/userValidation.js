const userRepository = require('../repositories/UserRepository')

const validateUserRequiredData = async (req, res, next) => {

    const user = req.user
    const { email } = req.body

    try {

        const loggedUser = await userRepository.findByEmail(email)

        if (!user) {
            if (loggedUser) return res.status(403).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado' })
        }

        if (loggedUser) {
            if (user.id !== loggedUser.id) return res.status(403).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
        }

        next()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}

module.exports = {
    validateUserRequiredData
}