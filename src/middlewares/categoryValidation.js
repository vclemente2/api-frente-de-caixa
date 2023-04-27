const NotFoundError = require('../errors/NotFoundError')
const { categoryRepository } = require('../repositories/CategoryRepository')

const validateCategoryExists = async (req, res, next) => {
    const { categoria_id } = req.body

    const category = await categoryRepository.findOne(categoria_id)

    if (!category) throw new NotFoundError ('Categoria não encontrada')

    next()
}

module.exports = {
    validateCategoryExists
}