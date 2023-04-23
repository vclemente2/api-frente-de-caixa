const joi = require('joi')

const loginSchema = joi.object({

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode ser vazio',
        'string.base': 'O campo email deve ser uma string'
    }),

    senha: joi.string().required().messages({
        'any.required': 'A senha é obrigatória',
        'string.empty': 'O campo senha não pode ser vazio',
        'string.base': 'O campo senha deve ser uma string'
    })

})

module.exports = loginSchema
