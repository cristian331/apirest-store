const { User, UserSchema } = require('./users.model');
const { Product, ProductSchema } = require('./products.model');
const { Category, CategorySchema } = require('./categories.model');


function setupModels (sequelize) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
