const { db } = require('./db');
const { User } = require('./User');
const Review = require('./Review');


const syncAndSeed = () => db.sync({ force: true })
  .then(() => Promise.all([
    User.create({ username: 'emily' }),
    User.create({ username: 'leovanny' }),
    User.create({ username: 'charlie' }),
    User.create({ username: 'david' }),
    Review.create({ text: 'Tihs producct is grate but I thunk im a litle drunk' }),
  ]));

module.exports = { syncAndSeed };
