'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('categorias',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      }
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('categorias');

  }
};
