const db = require('./db')
const User  = require('./User');
const Order = require('./Cart');
const Product = require('./Product');
const Review = require('./Review');
const LineItem = require('./LineItem')
const Image = require('./Image');


Review.belongsTo(User);
User.hasMany(Review);
Product.hasMany(Review, { as: 'Reviews' });

Order.hasMany(LineItem);
Order.belongsTo(User)

LineItem.belongsTo(Order);
LineItem.belongsTo(Product)

Product.belongsTo(Image);


const syncAndSeed = async () => {
try {
    await db.sync({ force: true })

    const [Emily, Leovanny, Charlie, David] = await Promise.all([
        User.create({ username: 'emily', email: 'emily@aol.com', password: 'ok', admin: true}),
        User.create({ username: 'leovanny',  email: 'leovanny@aol.com', password: 'leovanny'}),
        User.create({ username: 'charlie' , email: 'charlie@aol.com', password: 'charlie'}),
        User.create({ username: 'david',  email: 'david@aol.com', password: 'david' })
    ])

    const [review1, review2, review3] = await Promise.all([
        Review.create({
          text: 'Tihs producct is grate but I thunk im a litle drunk'
        }),
        Review.create({
          text: 'I had a whole 12 pack last night. I feel like trash right now.'
        }),
        Review.create({
          text: "The finest beer I've ever had!"
        })
    ])
    
    const [Stella, Duff, Alamo, Buzz, Benderbrau] = await Promise.all([
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

    await Promise.all([
      Alamo.setReviews(review1),
      Duff.setReviews(review2),
      Buzz.setReviews(review3),
      David.setReviews(review1),
      David.setReviews(review2),
      David.setReviews(review3)
    ])

  } catch(error) {
    console.log(error)
  }

}

module.exports = { 
    syncAndSeed,
    db, 
    User, 
    Product, 
    Review, 
    LineItem,
    Order
 };