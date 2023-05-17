const joi = require('joi')

const orderSchema = joi.object({
    cliente_id: joi.number().integer().greater(0).required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id deve ser um número',
        'number.integer': 'O campo cliente_id deve ser um número inteiro',
        'number.greater': 'O campo cliente_id deve ser um número positivo'
    }),
    observacao: joi.string().messages({
        'string.base': 'O campo observacao deve ser um texto',
    }),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: joi.number().integer().greater(0).required().messages({
                'any.required': 'O campo produto_id é obrigatório',
                'number.base': 'O campo produto_id deve ser um número',
                'number.integer': 'O campo produto_id deve ser um número inteiro',
                'number.greater': 'O campo produto_id deve ser um número positivo'
            }),
            quantidade_produto: joi.number().integer().greater(0).required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório',
                'number.base': 'O campo quantidade_produto deve ser um número',
                'number.integer': 'O campo quantidade_produto deve ser um número inteiro',
                'number.greater': 'O campo quantidade_produto deve ser um número positivo'
            })
        })
    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.base': 'O campo pedido_produtos deve ser um array',
        'array.items': 'O campo pedido_produtos deve ser um array de objetos'
    }),
})

module.exports = orderSchema