const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService  = require('./../../../services/users.service');
const service = new UserService();

const localStrategy = new Strategy( {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email)
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
