const UserRepository = require('../repositories/userRepository.js');

const uniqueEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const result = await UserRepository.findByEmail(email);

        if (result) {
            return res.status(400).json({ mensagem: `O email ${email} já está cadastrado` });
        }

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = uniqueEmail;
