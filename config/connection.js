const { Sequelize } = require('sequelize');

const client = process.env.PG_URL ? new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}) : new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USERNAME,
  process.env.LOCAL_DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

  module.exports = client;
