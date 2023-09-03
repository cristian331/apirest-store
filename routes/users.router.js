const express = require("express");
const UsersService = require("./../services/users.service")

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  // const limit = size || 10
  const users = await service.find();
  res.json(users);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.json({
    message: 'user will be found',
    user
  });
})

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.json({
    message: 'Created',
    data: newUser
  })
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateUser = await service.update(id, body)
  res.json({
    message: 'Updated',
    updateUser
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteUser = await service.detele(id);
  res.json({
    message: 'Deleted',
    deleteUser
  })
})

module.exports = router
