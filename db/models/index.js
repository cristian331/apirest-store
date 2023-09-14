const { User, UserSchema } = require('./users.model');
const { Product, ProductSchema } = require('./products.model');
const { Category, CategorySchema } = require('./categories.model');
const { Order, OrderSchema } = require('./orders.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model')


function setupModels (sequelize) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
