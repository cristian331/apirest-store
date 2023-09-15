const Joi = require('joi');

const id = Joi.number().min(1);
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const isblock = Joi.boolean();
const categoryId = Joi.number().integer().min(1).max(20);
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object ({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  isblock: isblock.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object ({
  name: name,
  price: price,
  description: description,
  image: image,
  isblock: isblock,
  categoryId: categoryId
});

const getProductSchema = Joi.object ({
  id: id.required()
});

const queryProductSchema = Joi.object ({
  limit,
  offset,
  price
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
