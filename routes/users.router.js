const express = require("express");
const UsersService = require("./../services/users.service");
const validatorHandler = require("./../middleware/validator.handler");
const { createUserSchema, updateUserSchema, getUserSchema } = require("./../schemas/users.schema");

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  // const limit = size || 10
  const users = await service.find();
  res.json(users);
})

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json({
        message: 'user will be found',
        user
      });
    } catch (err) {
      // res.status(404).json({
      //   message: err.message
      // })
      // ------------------ middleware
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.json({
        message: 'Created',
        data: newUser
      })
    } catch (err) {
      // res.status(404).json({
      //   message: err.message
      // })
      // ------------------ middleware
      next(err);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateUser = await service.update(id, body)
      res.json({
        message: 'Updated',
        updateUser
      })
    } catch (err) {
      // res.status(404).json({
      //   message: err.message
      // })
      // ------------------ middleware
      next(err);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteUser = await service.delete(id);
      res.json({
        message: 'Deleted',
        deleteUser
      })
    } catch (err) {
      // res.status(404).json({
      //   message: err.message
      // })
      // ------------------ middleware
      next(err);
    }
  }
);

module.exports = router
