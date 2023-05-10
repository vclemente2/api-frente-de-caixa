const joi = require('joi')

const imageSchema = joi.object({
    imagem: joi.string().required().messages({
        'any.required': 'O campo imagem é obrigatório',
        'string.empty': 'O campo imagem não pode ser vazio',
        'string.base': 'O campo imagem deve ser uma string'
    }),

})

module.exports = imageSchema