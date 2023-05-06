const joi = require('joi')

const productSchema = joi.object({

    descricao: joi.string().trim().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao não pode ser vazio',
        'string.base': 'O campo descricao deve ser uma string'
    }),
    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.min': 'O campo quantidade_estoque deve ser um número maior ou igual a zero',
        'number.base': 'O campo quantidade_estoque deve ser um número',
        'number.integer': 'O campo quantidade_estoque deve ser um número inteiro'
    }),
    valor: joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.greater': 'O campo valor deve ser um número positivo',
        'number.base': 'O campo valor deve ser um número',
        'number.integer': 'O campo valor deve ser um número inteiro'
    }),
    categoria_id: joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.greater': 'O campo categoria_id deve ser um número positivo',
        'number.base': 'O campo categoria_id deve ser um número',
        'number.integer': 'O campo categoria_id deve ser um número inteiro'
    })

})

module.exports = productSchema
