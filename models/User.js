const { db } = require('./db');

const User = db.define('user', {
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = {
  User
};
