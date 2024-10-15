const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.PG_URL) {
  console.log('Connecting to the production database...');
  sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  console.log('Connecting to the local database...');
  sequelize = new Sequelize(
    process.env.LOCAL_DB_NAME,
    process.env.LOCAL_DB_USERNAME,
    process.env.LOCAL_DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;
