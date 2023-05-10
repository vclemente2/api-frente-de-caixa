const joi = require('joi')

// Validar os campos obrigatórios:
// -   cliente_id
// -   pedido_produtos
//     -   produto_id
//     -   quantidade_produto
// -   Validar se existe cliente para o id enviado no corpo (body) da requisição.
// -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
// -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
// -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados. 
// -   Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso. 

const orderSchema = joi.object({
    cliente_id: joi.number().integer().greater().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id deve ser um número',
        'number.integer': 'O campo cliente_id deve ser um número inteiro',
        'number.greater': 'O campo cliente_id deve ser um número positivo'
    }),
    pedido_produtos: joi.array().items().required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.base': 'O campo pedido_produtos deve ser um array',
        'array.items': 'O campo pedido_produtos deve ser um array de objetos'
    }),
    'pedido_produtos.*.produto_id': joi.number().integer().greater().required().messages({
        'any.required': 'O campo produto_id é obrigatório',
        'number.base': 'O campo produto_id deve ser um número',
        'number.integer': 'O campo produto_id deve ser um número inteiro',
        'number.greater': 'O campo produto_id deve ser um número positivo'
    }),
    'pedido_produtos.*.quantidade_produto': joi.number().integer().greater().required().messages({
        'any.required': 'O campo quantidade_produto é obrigatório',
        'number.base': 'O campo quantidade_produto deve ser um número',
        'number.integer': 'O campo quantidade_produto deve ser um número inteiro',
        'number.greater': 'O campo quantidade_produto deve ser um número positivo'
    })
})

module.exports = orderSchema