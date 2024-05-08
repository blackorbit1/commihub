const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres',
  logging: false, // Disable logging for a cleaner console
  retry: {
    match: [
      /ECONNREFUSED/,
      /ETIMEDOUT/,
    ],
    max: 10, // Retry up to 10 times
  },
});

module.exports = sequelize;
