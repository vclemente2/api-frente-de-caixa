const { customerRepository } = require('../repositories/CustomerRepository')
const InternalServerError = require('../errors/InternalServerError')

const createCustomer = async (req, res) => {

    const customer = await customerRepository.create(req.body)

    if (!customer) throw new InternalServerError('Não foi possível cadastrar o cliente')

    return res.status(201).json(customer)

}

module.exports = {
    createCustomer
}