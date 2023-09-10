const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models'); // seputModels esta en index, lee en archivo en automatico


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);
//sequelize.sync(); // peligroso

module.exports = sequelize
