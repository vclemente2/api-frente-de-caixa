const { customerRepository } = require("../repositories/CustomerRepository")
const ConflictError = require('../errors/ConflictError')

const verifyUniqueEmail = async (req, res, next) => {

    const { id } = req.params
    const { email } = req.body

    const alreadyRegisteredCustomer = await customerRepository.findOne({ email })

    if (alreadyRegisteredCustomer) {
        if (!id) throw new ConflictError('Já existe cliente cadastrado com o e-mail informado')

        const customer = await customerRepository.findOne({ id })
        if (customer.email !== alreadyRegisteredCustomer.email) throw new ConflictError('O e-mail informado já pertence a outro cliente')
    }

    next()

}

const verifyUniqueCpf = async (req, res, next) => {

    const { id } = req.params
    const { cpf } = req.body

    const alreadyRegisteredCustomer = await customerRepository.findOne({ cpf })

    if (alreadyRegisteredCustomer) {
        if (!id) throw new ConflictError('Já existe cliente cadastrado com o cpf informado')

        const customer = await customerRepository.findOne({ id })
        if (customer.cpf !== alreadyRegisteredCustomer.cpf) throw new ConflictError('O cpf informado já pertence a outro cliente')
    }

    next()

}

module.exports = {
    verifyUniqueEmail,
    verifyUniqueCpf
}