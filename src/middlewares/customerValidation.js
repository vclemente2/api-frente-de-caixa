const { customerRepository } = require("../repositories/CustomerRepository")

const verifyUniqueEmail = async (req, res, next) => {
    const { email } = req.body

    const emailExists = await customerRepository.findOne() // CONTINUAR
}

const verifyUniqueCpf = (req, res, next) => {

}