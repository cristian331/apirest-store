const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./users.service');
const service = new UserService();

class AuthService {

  async getUser (email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    return user;
  }

  signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery (email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    };
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret);
    await service.update(user.id, {recoveryToken: token});
    const link = `http://myapp.com/recovery?token=${token}`;

    const mail = {
      from: config.tastEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recuperar contraseña", // Subject line
      html: `<b>Ingresa al siguiente link => ${link}</b>`, // html body
    }
    return await this.sendMail(mail);
  }

  async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.tastEmail,
        pass: config.passEmail
      }
    });
    await transporter.sendMail(infoMail)
    return { message: 'mail has been sent' };
  };


  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      };

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {password: hash, recoveryToken: null});
      return {message: 'Password has been change'};
    } catch (error) {
      throw boom.unauthorized();
    }
  };
}

module.exports = AuthService;
