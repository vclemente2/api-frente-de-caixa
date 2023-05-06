const { customerRepository } = require('../repositories/CustomerRepository')
const InternalServerError = require('../errors/InternalServerError')
const getAdressByCep = require('../utils/getAdressByCep')

const createCustomer = async (req, res) => {

    if (req.body.cep) {
        req.body = await getAdressByCep(req.body)
    }

    const customer = await customerRepository.create(req.body)

    if (!customer) throw new InternalServerError('Não foi possível cadastrar o cliente')

    return res.status(201).json(customer)

}

const updateCustomer = async (req, res) => {

    if (req.body.cep) {
        req.body = await getAdressByCep(req.body)
    }

    const customer = await customerRepository.update(req.body, { id: req.params.id })

    if (!customer) throw new InternalServerError('Não foi possível atualizar o cliente')

    return res.status(204).send()

}

const listCostumers = async (req, res) => {

    const customers = await customerRepository.findAll()

    return res.json(customers)
}

const customerProfile = async (req, res) => {
    return res.json(req.customer)
}

module.exports = {
    createCustomer,
    updateCustomer,
    listCostumers,
    customerProfile
}
