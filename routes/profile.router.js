const express = require("express");
const passport = require('passport');
const OrderService = require('./../services/orders.service');

const router = express.Router();
const service = new OrderService();


router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      delete orders[0].dataValues.user.dataValues.password

      res.json(orders)
    } catch (err) {
          next(err);
    }
  }
);

module.exports = router
