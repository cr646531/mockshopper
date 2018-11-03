const Sequelize = require('sequelize');
// leaving the logging on in order to debug once we are ready to seed some data
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/my_db');

module.exports = db