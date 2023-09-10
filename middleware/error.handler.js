const { ValidationError } = require('sequelize');

// ENVIAR LOS ERRORS A LA CONSOLA
function logErros (err, req, res, next) {
  console.log('logErros');
  console.error(err);
  next(err);  //el siguiente middleware debe ser de tipo error al enviar err como argunmento en el next()
}

// ENVIAR LOS ERROS COMO RESPUESTA AL CLIENTE
function errorHandler (err, req, res, next) {
  console.log('errorHandler');

  res.status(500).json({
    message: err.message,
    stack: err.stack // para saber donde ocurrio el error

  })
}

function boomErrorHandler (err, req, res, next) {
  console.log('BoomErrorHandler');

  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err);
}

module.exports = { logErros, errorHandler, boomErrorHandler, ormErrorHandler }
