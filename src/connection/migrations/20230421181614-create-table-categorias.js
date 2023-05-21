'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.createTable('categorias',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        descricao: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      }
    )

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.dropTable('categorias')

  }
}
