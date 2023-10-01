const boom = require('@hapi/boom');
const{ config } = require('./../config/config');

function checkApiKey (req,res,next) {
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey) {
    next();
  }else{
    next(boom.unauthorized()
    );
  }
};

// debe implementarse despues de validar el token, el cual, devuelve el payload 'user'
function checkRoles (...roles) {
  return (req, res, next) => { // closure
    const user = req.user;
    if (roles.includes(user.role)) {
      next()
    } else {
      boom.unauthorized(`Don't have permision for this action`)
    }
  }
}
module.exports={ checkApiKey, checkRoles }
