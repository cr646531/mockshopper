
const  db  = require('./associations');
const  User  = require('./User');
const Product = require('./Product');
const Review = require('./Review');

const syncAndSeed = () =>
  db.sync({ force: true }).then(() =>
    Promise.all([
      User.create({ username: 'emily', email: 'emily@aol.com', password: 'ok'}),
      User.create({ username: 'leovanny',  email: 'leovanny@aol.com'}),
      User.create({ username: 'charlie' , email: 'charlie@aol.com' }),
      User.create({ username: 'david',  email: 'david@aol.com' }),
      Review.create({
        text: 'Tihs producct is grate but I thunk im a litle drunk'
      }),
      Product.create({
        name: 'Stella',
        description: `Stella Artois (/ˈstɛlə ɑːrˈtwɑː/ STEL-ə ar-TWAH) is a Belgian pilsner of between 4.8 and 5.2% ABV which was first brewed by Brouwerij Artois (the Artois Brewery) in Leuven, Belgium, in 1926. Since 2008, a 4% ABV version has also been sold in Britain, Ireland, Canada and New Zealand. Stella Artois is now owned by Interbrew International B.V. which is a subsidiary of the world's largest brewer, Anheuser-Busch InBev SA/NV.`,
        category: 'Pilsner'
      }),
      Product.create({
        name: 'Duff Beer',
        description: `Simpsons reference.`,
        category: 'Fictional'
      }),
      Product.create({
        name: 'Pawtucket Patriot Ale',
        description: `Family Guy's beer`,
        category: 'Fictional'
      }),
      Product.create({
        name: 'Alamo Beer',
        description: `King of the Hill`,
        category: 'Fictional'
      }),
      Product.create({
        name: 'Buzz Beer',
        description: `Beer with coffee in it`,
        category: 'Fictional'
      }),
      Product.create({
        name: 'Bendërbrau',
        description: `Beer made by Bender in Futurama`,
        category: 'Fictional'
      })
    ])
  );

module.exports = { syncAndSeed };
