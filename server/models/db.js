const Sequelize = require('sequelize');
// leaving the logging on in order to debug once we are ready to seed some data
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

module.exports = db