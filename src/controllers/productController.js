const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const { productRepository } = require('../repositories/ProductRepository');
const { categoryRepository } = require('../repositories/CategoryRepository')

const createProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    const product = await productRepository.create({ descricao, quantidade_estoque, valor, categoria_id })

    if (!product) throw new InternalServerError('Não foi possível criar o produto')

    return res.status(201).json(product)
}

const updateProduct = async (req, res) => {

    const product = await productRepository.update(req.body, { id: req.params.id })

    if (!product) throw new InternalServerError('Não foi possível atualizar o produto')

    return res.status(204).send()
}

const getProduct = async (req, res) => {
    const { categoria_id } = req.query;

    // se categoria_id for iformada, filtra os produtos de acordo com a categoria
    if (categoria_id) {
        const category = await categoryRepository.findOne(categoria_id)

        if (!category) throw new NotFoundError('Categoria não encontrada')
        console.log(category)

        const aproduct = await productRepository.findAll({categoria_id})
        console.log(aproduct)

        if (!aproduct) throw new NotFoundError('Não há produtos para essa categoria')

        return res.json(aproduct)
    }

    const product = await productRepository.findAll()

    return res.json(product)

    // precisa validar se a categoria existe
    //se a categoria existe, verifica se tem produtos
    // se tiver produtos, retorna os produtos

    // se categoria_id não for informada, retorna todos os produtos





    // const { categoria_id } = req.query;

    // if (!categoria_id) {
    //     const product = await productRepository.findAll()
    //     return res.status(200).json(product)
    // }
    // const product = await productRepository.findAll(categoria_id)

    // if (product) {
    //     const category = await categoryRepository.findOne(categoria_id)
    //     if (!category) throw new NotFoundError('Categoria não encontrada')
    //     return res.json(product)
    // }
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct
}
