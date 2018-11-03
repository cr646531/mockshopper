const db = require('./db');

const User = db.define('user', {
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
  username: {
    type: db.Sequelize.STRING,
  },
  password: {
    type: db.Sequelize.STRING,
  },
  googleId: db.Sequelize.STRING,
  admin: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  }
});



module.exports = User;
