const express = require('express');

const usersRuoter = require('./users.router.js');
const productsRuoter = require('./products.router.js');
const categoriesRuoter = require('./categories.router.js');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/users',  usersRuoter);
  router.use('/products', productsRuoter);
  router.use('/categories', categoriesRuoter);
}

module.exports = routerApi;
