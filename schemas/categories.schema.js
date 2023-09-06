const Joi = require('joi');

const id = Joi.number().max(99);
const name = Joi.string().min(3).max(20);


const createCategorySchema = Joi.object ({
  name: name.required(),
});

const updateCategorySchema = Joi.object ({
  name: name.required(),
});

const getCategorySchema = Joi.object ({
  id: id.required()
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
