'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const categories = ['Informática', 'Celulares', 'Beleza e Perfumaria', 'Mercado', 'Livros e Papelaria', 'Brinquedos', 'Moda', 'Bebê', 'Games']

    await queryInterface.bulkInsert('categorias', categories.map(category => { return { descricao: category } }))


  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categorias', null, {});

  }
}
