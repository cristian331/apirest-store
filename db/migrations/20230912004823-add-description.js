'use strict';

/** @type {import('sequelize-cli').Migration} */
const { ProductSchema, PRODUCT_TABLE} = require('./../models/products.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
  }
};
