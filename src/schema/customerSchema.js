const joi = require('joi')

const customerSchema = joi.object({
    nome: joi.string().trim().min(3).pattern(/^[a-záàâãéèêíïóôõöúçñ ]+$/i, 'alpha').required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome não pode ser vazio',
        'string.min': 'O campo nome deve ter pelo menos 3 caracteres',
        'string.base': 'O campo nome deve ser um texto.',
        'string.pattern.base': 'O campo nome não permite caracteres especiais ou números'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode ser vazio',
        'string.email': 'O campo email deve ter o formato de email',
        'string.base': 'O campo email deve ter o formato de email'
    }),
    cpf: joi.string().trim().replace('.', '').replace('-', '').length(11).required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf não pode ser vazio',
        'string.base': 'O campo cpf deve ser uma string',
        'string.length': 'O campo cpf deve conter onze números'
    }),
    cep: joi.string().trim().allow('').replace('-', '').pattern(/^[0-9]+$/, 'numbers').length(8).messages({
        'string.base': 'O campo cep deve ser uma string',
        'string.pattern.base': 'O campo cep só permite números e "-"',
        'string.length': 'O campo cep deve conter 8 números'
    }),
    rua: joi.string().trim().allow('').messages({
        'string.base': 'O campo cep deve ser uma string'
    }),
    numero: joi.string().allow('').trim().pattern(/^[0-9]+$/, 'numbers').messages({
        'string.base': 'O campo numero deve ser uma string',
        'string.pattern.base': 'O campo numero só permite números',
    }),
    bairro: joi.string().allow('').trim().messages({
        'string.base': 'O campo numero deve ser uma string'
    }),
    cidade: joi.string().allow('').trim().messages({
        'string.base': 'O campo cidade deve ser uma string'
    }),
    estado: joi.string().allow('').trim().messages({
        'string.base': 'O campo estado deve ser uma string'
    })

})

module.exports = customerSchema