'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true
        },
        nome: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: true
        },
        senha: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('usuarios');

  }
};
