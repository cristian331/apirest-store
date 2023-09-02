const express = require("express");
const { faker } = require('@faker-js/faker');

const router = express.Router();

function createFakerCategories (limit) {
  const categories = [];
  for (let i = 0; i < limit; i++) {
    categories.push({
      id: faker.number.int(100),
      category: faker.commerce.department()
    });
  }
  return categories
}


// Solicitud enviar products
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10
  const categories = createFakerCategories(limit);
  res.json(categories);
})

router.get('/:id', (req, res) => {
  const id = req.params;
  res.json({
    message: 'category will be found',
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
    data: {...id,
      ...body
    }
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
