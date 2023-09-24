const Joi = require('joi');

// const email = Joi.string().min(5).max(50);
const password = Joi.string().min(5).max(20);
const token = Joi.string().alphanum().min(10);


const changePasswordSchema = Joi.object ({
  token: token.replace(),
  password: password.required()
});



module.exports = { changePasswordSchema }
