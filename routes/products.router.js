const express = require("express");
const { faker } = require('@faker-js/faker');

const router = express.Router();

function createFakerProducts (limit) {
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }
  return products
}


// Solicitud enviar products
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10
  const products = createFakerProducts(limit);
  res.json(products);
})


module.exports = router
