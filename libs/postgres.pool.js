//conexion a terceros-- DataBase
const { Pool } = require('pg');
const { config } = require('./../config/config');

// const pool = new Pool({
//   host:
//   port:
//   user:
//   password:
//   database:
// });

//con informacion insertada en variables de entorno

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`


const pool = new Pool({ connectionString: URI});

module.exports = pool;
