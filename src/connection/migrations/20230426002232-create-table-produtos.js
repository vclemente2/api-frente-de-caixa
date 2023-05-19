'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantidade_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {

    return queryInterface.dropTable('produtos')

  }
}
