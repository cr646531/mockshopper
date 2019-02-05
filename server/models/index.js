const db = require('./db')
const User  = require('./User');
const Order = require('./Cart');
const Product = require('./Product');
const Review = require('./Review');
const LineItem = require('./LineItem')
const Image = require('./Image');

const { stella } = require('./sampleImages');


Review.belongsTo(User);
User.hasMany(Review);
Product.hasMany(Review, { as: 'Reviews' });

Order.hasMany(LineItem);
Order.belongsTo(User)

LineItem.belongsTo(Order);
LineItem.belongsTo(Product)

Product.belongsTo(Image);


const syncAndSeed = async () => {

  return db.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ username: 'emily', email: 'emily@aol.com', password: 'ok', admin: true}),
        User.create({ username: 'leovanny',  email: 'leovanny@aol.com', password: 'leovanny'}),
        User.create({ username: 'charlie' , email: 'charlie@aol.com', password: 'charlie'}),
        User.create({ username: 'david',  email: 'david@aol.com', password: 'david' })
      ])
    })
    .then(() => {
      return Promise.all([
      review1 = await Review.create({ text: 'Tihs producct is grate but I thunk im a litle drunk' }),
      review2 = await Review.create({ text: 'I had a whole 12 pack last night. I feel like trash right now.' }),
      review3 = await Review.create({ text: "The finest beer I've ever had!" })
      ])
    })
    .then(() => {
      return Promise.all([
      stella = await Product.create({ name: 'Stella', description: `Stella description`, category: 'Pilsner' }),
      duff = await Product.create({ name: 'Duff Beer', description: `Simpsons reference.`, category: 'Fictional' }),
      pawtucket = await Product.create({ name: 'Pawtucket Patriot Ale', description: `Family Guy's beer`, category: 'Fictional' }),
      alamo = await Product.create({ name: 'Alamo Beer', description: `King of the Hill`, category: 'Fictional' }),
      buzz = await Product.create({ name: 'Buzz Beer', description: `Beer with coffee in it`, category: 'Fictional' }),
      bend = await Product.create({ name: 'Bendërbrau', description: `Beer made by Bender in Futurama`, category: 'Fictional' }),
      stellaImage = await Image.create({ data: stella })
      ])
    })
    .catch(error => console.log(error))
}



// const syncAndSeed = async () => {

//     return db.sync({ force: true })
//     .then(async () => {
//     const [Emily, Leovanny, Charlie, David] = await Promise.all([
//         User.create({ username: 'emily', email: 'emily@aol.com', password: 'ok', admin: true}),
//         User.create({ username: 'leovanny',  email: 'leovanny@aol.com', password: 'leovanny'}),
//         User.create({ username: 'charlie' , email: 'charlie@aol.com', password: 'charlie'}),
//         User.create({ username: 'david',  email: 'david@aol.com', password: 'david' })
//     ])

//     const [review1, review2, review3] = await Promise.all([
//         Review.create({
//           text: 'Tihs producct is grate but I thunk im a litle drunk'
//         }),
//         Review.create({
//           text: 'I had a whole 12 pack last night. I feel like trash right now.'
//         }),
//         Review.create({
//           text: "The finest beer I've ever had!"
//         })
//     ])
    
//     const [Stella, Duff, Paw, Alamo, Buzz, Benderbrau, stellaImage] = await Promise.all([
//         Product.create({
//           name: 'Stella',
//           description: `Stella description`,
//           category: 'Pilsner'
//         }),
//         Product.create({
//           name: 'Duff Beer',
//           description: `Simpsons reference.`,
//           category: 'Fictional'
//         }),
//         Product.create({
//           name: 'Pawtucket Patriot Ale',
//           description: `Family Guy's beer`,
//           category: 'Fictional'
//         }),
//         Product.create({
//           name: 'Alamo Beer',
//           description: `King of the Hill`,
//           category: 'Fictional'
//         }),
//         Product.create({
//           name: 'Buzz Beer',
//           description: `Beer with coffee in it`,
//           category: 'Fictional'
//         }),
//         Product.create({
//           name: 'Bendërbrau',
//           description: `Beer made by Bender in Futurama`,
//           category: 'Fictional'
//         }),
//         Image.create({
//           data: stella
//         })
//     ])

//     await Promise.all([
//       Alamo.setReviews(review1),
//       Duff.setReviews(review2),
//       Buzz.setReviews(review3),
//       David.setReviews(review1),
//       David.setReviews(review2),
//       David.setReviews(review3),
//       Stella.setImage(stellaImage)
//     ])
//   })

// }

module.exports = { 
    syncAndSeed,
    db, 
    User, 
    Product, 
    Review, 
    LineItem,
    Order
 };