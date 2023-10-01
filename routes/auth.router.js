const express = require("express");
const passport = require('passport');
const validatorHandler = require("./../middleware/validator.handler");
const { changePasswordSchema } = require("./../schemas/auth.schema");

const AuthService  = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (err) {
      next(err);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email)
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/change-password',
validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rta = await service.changePassword(token, password)
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router
