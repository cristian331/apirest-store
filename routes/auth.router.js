const express = require("express");
const passport = require('passport');
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
      const { email } = req.user;
      const rta = await service.sendMail(email)
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router
