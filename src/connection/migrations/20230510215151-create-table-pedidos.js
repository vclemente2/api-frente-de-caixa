'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      observacao: {
        type: Sequelize.STRING
      },
      valor_total: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }
    )

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.dropTable('pedidos')

  }
}
