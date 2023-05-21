'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('produtos', 'produto_imagem', {
      type: Sequelize.STRING,
      unique: true
    }
    )

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('produtos', 'produto_imagem')

  }
}
