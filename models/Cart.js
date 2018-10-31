const { db } = require('./db');
const Sequelize = require('sequelize');

const Order = db.define('order', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('CART', 'ORDER'),
    allowNull: false,
    defaultValue: 'CART'
  }
});

module.exports = Order;
