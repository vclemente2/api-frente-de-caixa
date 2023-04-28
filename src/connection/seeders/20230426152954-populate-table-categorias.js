'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const categories = ['Informática', 'Celulares', 'Beleza e Perfumaria', 'Mercado', 'Livros e Papelaria', 'Brinquedos', 'Moda', 'Bebê', 'Games']

    return queryInterface.bulkInsert('categorias', categories.map(category => { return { descricao: category } }))

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('categorias', null, {})

  }
};
