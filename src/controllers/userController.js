// A implementar
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const CategoryRepository = require('../repositories/CategoryRepository');

const createUser = async (req, res) => {
    const {
        nome,
        email,
        senha,
    } = req.body;



    try {

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const user = await UserRepository.create({
            nome,
            email,
            senha: encryptedPassword
        })


        if (!user) {
            return res
                .status(500).json({ mensagem: 'O usuário não foi cadastrado.' });
        }

        const { senha: _, ...newUser } = user[0];

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};


const listCategory = async (req, res) => {


    const category = await CategoryRepository.findAll()

    return res.status(200).json(category)

}

module.exports = {
    createUser,
    listCategory
}