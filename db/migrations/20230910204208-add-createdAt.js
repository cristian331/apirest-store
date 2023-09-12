'use strict';

const { ProductSchema, PRODUCT_TABLE} = require('./../models/products.model');
const { UserSchema, USER_TABLE} = require('./../models/users.model');


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'created_at', ProductSchema.createdAt);
    await queryInterface.addColumn(USER_TABLE, 'created_at', UserSchema.createdAt);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'created_at');
    await queryInterface.removeColumn(USER_TABLE, 'created_at');
  }
};
