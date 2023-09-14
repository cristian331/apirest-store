const Joi = require('joi');

const id = Joi.number().integer()
const userId = Joi.number().integer();

const createOrderSchema = Joi.object({
  userId: userId.required(),
});

const getOrderSchema = Joi.object({
	id: id.required(),
})

module.exports = { createOrderSchema, getOrderSchema }
