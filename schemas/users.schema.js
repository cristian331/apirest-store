const Joi = require('joi');

const id = Joi.number().max(20);
const name = Joi.string().min(3).max(20);
const email = Joi.string().min(5).max(20);
const password = Joi.string().min(5).max(20);
const sex = Joi.string().alphanum().max(6);
const jobArea = Joi.string().min(3).max(20);

const createUserSchema = Joi.object ({
  name: name.required(),
  email: email,
  password: password.required(),
  sex: sex.required(),
  jobArea: jobArea.required()
});

const updateUserSchema = Joi.object ({
  name: name,
  email: email,
  password: password,
  sex: sex,
  jobArea: jobArea
});

const getUserSchema = Joi.object ({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }