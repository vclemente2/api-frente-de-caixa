const axios = require('../config/viaCep')
const UnprocessableContentError = require('../errors/UnprocessableContentError')

const getAdressByCep = async (customerData) => {

    const { data } = await axios.get(`${customerData.cep}/json`)

    if (data.erro) throw new UnprocessableContentError('O cep informado não é válido')

    customerData.rua = data.logradouro
    customerData.bairro = data.bairro
    customerData.cidade = data.localidade
    customerData.estado = data.uf

    return customerData

}

module.exports = getAdressByCep
