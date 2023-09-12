'use strict';

const { ProductSchema, PRODUCT_TABLE} = require('./../models/products.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  }
};
