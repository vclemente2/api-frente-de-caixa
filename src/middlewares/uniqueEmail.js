// verificar o funcionamento dentro do código do projeto

const knex = require('../database/connection');// verificar o caminho correto

const uniqueEmail = async (req, res, next) => {
try {
const { email } = req.body;

const result = await knex(usuarios).where({ email }).first();

 if(result){
return res.status(400).json({ mensagem: `O email ${req.body.email} já está cadastrado` });
}

next()

} catch (error) {
return res.status(400).json({ mensagem: `O email ${req.body.email} já está cadastrado` });
}
}

module.exports = uniqueEmail;
