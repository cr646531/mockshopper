const { db } = require('./db');
const { User } = require('./User');
const Review = require('./Review');


const syncAndSeed = () => db.sync({ force: true })
  .then(() => Promise.all([
    User.create({ email: 'emily@aol.com', username: 'emily'}),
    User.create({ email: 'leovanny@aol.com', username: 'leovanny' }),
    User.create({ email: 'charlie@aol.com', username: 'charlie' }),
    User.create({ email: 'david@aol.com', username: 'david'}),
    Review.create({ text: 'Tihs producct is grate but I thunk im a litle drunk' }),
  ]));

module.exports = { syncAndSeed };
