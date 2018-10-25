const { db } = require('./db');
const { User } = require('./User');


const syncAndSeed = () => db.sync({ force: true })
  .then(() => Promise.all([
    User.create({ username: 'emily' }),
    User.create({ username: 'leovanny' }),
    User.create({ username: 'charlie' }),
    User.create({ username: 'david' }),
  ]));

module.exports = { syncAndSeed };
