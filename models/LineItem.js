const { db } = require('./db');

const LineItem = db.define('lineItem', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
});

module.exports = { LineItem };
