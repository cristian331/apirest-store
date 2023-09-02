const express = require("express");
const { faker } = require('@faker-js/faker');

const router = express.Router();

function createFakerUsers (limit) {
  const users = [];
  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.person.fullName(),
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


module.exports = router
