const { customerRepository } = require('../repositories/CustomerRepository')
const InternalServerError = require('../errors/InternalServerError')

const createCustomer = async (req, res) => {

    const customer = await customerRepository.create(req.body)

    if (!customer) throw new InternalServerError('Não foi possível cadastrar o cliente')

    return res.status(201).json(customer)

}

const updateCustomer = async (req, res) => {

    const customer = await customerRepository.update(req.body, { id: req.params.id })

    if (!customer) throw new InternalServerError('Não foi possível atualizar o cliente')

    return res.status(204).send()

}

const listCostumers = async (req, res) => {

    const customers = await customerRepository.findAll()

    return res.json(customers)
}

module.exports = {
    createCustomer,
    updateCustomer, 
    listCostumers
}
