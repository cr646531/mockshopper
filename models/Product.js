const { db } = require('./db');

const Product = db.define('product', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: db.Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: db.Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = { Product };
