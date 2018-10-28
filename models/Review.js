const {db} = require('./db');

const Review = db.define('review', {
  text: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      min: 20
    }
  }
});

module.exports = Review;
