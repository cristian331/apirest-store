//conexion a terceros-- DataBase
const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'cristian',
  password: 'admin123',
  database: 'my_store'
});

module.exports = pool;
