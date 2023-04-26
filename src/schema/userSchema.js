const joi = require('joi')

const userRegistration = joi.object({
    nome: joi.string().min(3).trim().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome não pode ser vazio',
        'string.min': 'O campo nome deve ter pelo menos 3 caracteres',
        'string.base': 'O campo nome deve ser um texto.'
    }),
    email: joi.string().email().trim().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode ser vazio',
        'string.email': 'O campo email deve ter o formato de email',
        'string.base': 'O campo email deve ter o formato de email'
    }),
    senha: joi.string().min(6).trim().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser vazio',
        'string.min': 'O campo senha deve ter pelo menos 6 caracteres',
        'string.base': 'O campo senha deve ser um texto.'
    })
})

module.exports = userRegistration
