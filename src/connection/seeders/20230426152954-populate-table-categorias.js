'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const categories = require('../../data/categories')

    return queryInterface.bulkInsert('categorias', categories.map(category => { return category }))

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('categorias', null, {})

  }
};
