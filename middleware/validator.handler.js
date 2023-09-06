const boom = require('@hapi/boom');

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property]; // dinamico -- en property se envia de donde viene a informacion: params, body o query
    const { error } = schema.validate(data, { abortEarly:false });
    if (error) {
      next(boom.badRequest(error))
    }
    next(); // validacion correcta
  }
};

module.exports = validatorHandler;
