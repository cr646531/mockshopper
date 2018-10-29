const { db } = require('./db');
const { User } = require('./User');
const {Product } = require('./Product');
const Review = require('./Review');

const syncAndSeed = () =>
  db.sync({ force: true }).then(() =>
    Promise.all([
      User.create({ username: 'emily' }),
      User.create({ username: 'leovanny' }),
      User.create({ username: 'charlie' }),
      User.create({ username: 'david' }),
      Review.create({
        text: 'Tihs producct is grate but I thunk im a litle drunk'
      }),
      Product.create({
        name: 'Stella',
        description: `
Stella Artois (/ˈstɛlə ɑːrˈtwɑː/ STEL-ə ar-TWAH) is a Belgian pilsner of between 4.8 and 5.2% ABV which was first brewed by Brouwerij Artois (the Artois Brewery) in Leuven, Belgium, in 1926. Since 2008, a 4% ABV version has also been sold in Britain, Ireland, Canada and New Zealand. Stella Artois is now owned by Interbrew International B.V. which is a subsidiary of the world's largest brewer, Anheuser-Busch InBev SA/NV.`,
        category: 'Pilsner'
      })
    ])
  );

module.exports = { syncAndSeed };
