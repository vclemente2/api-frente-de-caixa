const joi = require('joi');

const userRegistration = joi.object({
    name: joi.string().min(3).required().messages({
        'any.required': 'O campo "name" é obrigatório',
        'string.empty': 'O campo "name" não pode ser vazio',
        'string.min': 'O campo "name" deve ter pelo menos 3 caracteres'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo "email" é obrigatório',
        'string.empty': 'O campo "email" não pode ser vazio',
        'string.email': 'O campo "email" deve ter o formato de email'
    }),
    password: joi.string().min(6).required().messages({
        'any.required': 'O campo "password" é obrigatório',
        'string.empty': 'O campo "password" não pode ser vazio',
        'string.min': 'O campo "password" deve ter pelo menos 6 caracteres'
    })
})

module.exports = userRegistration;