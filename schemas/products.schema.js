const Joi = require('joi');

const id = Joi.number().min(1);
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isblock = Joi.boolean()

const createProductSchema = Joi.object ({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isblock: isblock.required()
});

const updateProductSchema = Joi.object ({
  name: name,
  price: price,
  image: image,
  isblock: isblock
});

const getProductSchema = Joi.object ({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
