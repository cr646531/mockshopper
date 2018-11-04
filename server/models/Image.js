const db = require('./db');

const Image = db.define('image', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  data: {
    type: db.Sequelize.TEXT
  }
});

module.exports = Image;
