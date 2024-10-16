const { Sequelize } = require('sequelize');

const sequelize = process.env.PG_URL ? new Sequelize(process.env.PG_URL, {
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

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
