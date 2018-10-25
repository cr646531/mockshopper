const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgress://localhost:5432/my_db');
// leaving the logging on in order to debug once we are ready to seed some data

module.exports = {
  db,
};
