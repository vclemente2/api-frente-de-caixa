const categoryRepository = require('../repositories/CategoryRepository')

const listCategory = async (req, res) => {

    const categories = await categoryRepository.findAll()

    return res.status(200).json(categories)

}

module.exports = {
    listCategory
}