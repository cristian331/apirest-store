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

router.get('/:id', (req, res) => {
  const id = req.params;
  res.json({
    message: 'product will be found',
    id
  });
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const id = req.params
  const body = req.body;
  res.json({
    message: 'Updated',
    id,
    data: body
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params;
  res.json({
    message: 'Deleted',
    id
  })
})
module.exports = router
