const express = require("express");
const { faker } = require('@faker-js/faker');

const router = express.Router();

function createFakerUsers (limit) {
  const users = [];
  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      sex: faker.person.sex(),
      job_area: faker.person.jobArea()
    });
  }
  return users
}


// Solicitud enviar products
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10
  const users = createFakerUsers(limit);
  res.json(users);
})

router.get('/:id', (req, res) => {
  const id = req.params;
  res.json({
    message: 'user will be found',
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
