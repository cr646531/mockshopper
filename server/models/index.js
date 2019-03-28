const db = require('./db')
const User  = require('./User');
const Order = require('./Cart');
const Product = require('./Product');
const Review = require('./Review');
const LineItem = require('./LineItem')
const Image = require('./Image');

const tshirtData = require('./sampleImages/tshirt');
const poloData = require('./sampleImages/polo');
const tanktopData = require('./sampleImages/tanktop');
const sneakersData = require('./sampleImages/sneakers');
const bootsData = require('./sampleImages/boots');
const sandalsData = require('./sampleImages/sandals');
const jeansData = require('./sampleImages/jeans');
const khakisData = require('./sampleImages/khakis');
const cargosData = require('./sampleImages/cargos');


Review.belongsTo(User);
User.hasMany(Review);
Product.hasMany(Review, { as: 'Reviews' });

Order.hasMany(LineItem);
Order.belongsTo(User)

LineItem.belongsTo(Order);
LineItem.belongsTo(Product)

Product.belongsTo(Image);


const sync = ()=> db.sync({ force: true });

const seed = ()=> {
  let tshirt, polo, tanktop, sneakers, boots, sandals, jeans, khakis, cargos;
  let tshirtReview, poloReview, tanktopReview, sneakersReview, bootsReview, sandalsReview, jeansReview, khakisReview, cargosReview;
  let tshirtImage, poloImage, tanktopImage, sneakersImage, bootsImage, sandalsImage, jeansImage, khakisImage, cargosImage;

  return Promise.all([
    Product.create({ name: 'T-Shirt', description: 'A shirt named after the T shape of its body and sleeves', category: 'Shirts'}),
    Product.create({ name: 'Polo', description: "A shirt with a collar styled after polo players in the 1920's", category: 'Shirts' }),
    Product.create({ name: 'Tank Top', description: 'A shirt without sleeves commonly worn by athletes', category: 'Shirts' }),
    Product.create({ name: 'Sneakers', description: 'Shoes primarily designed for sports or everyday wear', category: 'Shoes' }),
    Product.create({ name: 'Boots', description: 'Shoes that cover the foot and ankle and extend up the leg', category: 'Shoes' }),
    Product.create({ name: 'Sandals', description: "Shoes consisting of a sole held to the wearer's foot with straps", category: 'Shoes' }),
    Product.create({ name: 'Jeans', description: 'Pants made from denim or dungaree cloth', category: 'Pants' }),
    Product.create({ name: 'Khakis', description: 'Pants made from cotton worn in both casual and formal settings', category: 'Pants' }),
    Product.create({ name: 'Cargos', description: 'Pants made from sturdy fabrics that are loose fitting', category: 'Pants' })
  ])
    .then((products)=> {
      [tshirt, polo, tanktop, sneakers, boots, sandals, jeans, khakis, cargos, stella] = products;
      return Promise.all([
        Review.create({ text: "This T-shirt is very comfortable" }),
        Review.create({ text: "This polo is practical and stylish" }),
        Review.create({ text: "This tank top is perfect for excersizing" }),
        Review.create({ text: "These sneakers are great for running" }),
        Review.create({ text: "These boots work well for hiking" }),
        Review.create({ text: "These sandals are perfect for relaxing" }),
        Review.create({ text: "These jeans are very casual" }),
        Review.create({ text: "These khakis go with everything" }),
        Review.create({ text: "These cargos are great for camping" })
      ])
    })
      .then((reviews)=> {
        [tshirtReview, poloReview, tanktopReview, sneakersReview, bootsReview, sandalsReview, jeansReview, khakisReview, cargosReview] = reviews;
        return Promise.all([
          Image.create({ data: tshirtData }),
          Image.create({ data: poloData }),
          Image.create({ data: tanktopData }),
          Image.create({ data: sneakersData }),
          Image.create({ data: bootsData }),
          Image.create({ data: sandalsData }),
          Image.create({ data: jeansData }),
          Image.create({ data: khakisData }),
          Image.create({ data: cargosData })
        ])
      })
        .then((images)=> {
          [tshirtImage, poloImage, tanktopImage, sneakersImage, bootsImage, sandalsImage, jeansImage, khakisImage, cargosImage] = images;
          return Promise.all([
            tshirt.setReviews(tshirtReview),
            polo.setReviews(poloReview),
            tanktop.setReviews(tanktopReview),
            sneakers.setReviews(sneakersReview),
            boots.setReviews(bootsReview),
            sandals.setReviews(sandalsReview),
            jeans.setReviews(jeansReview),
            khakis.setReviews(khakisReview),
            cargos.setReviews(cargosReview),
            tshirt.setImage(tshirtImage),
            polo.setImage(poloImage),
            tanktop.setImage(tanktopImage),
            sneakers.setImage(sneakersImage),
            boots.setImage(bootsImage),
            sandals.setImage(sandalsImage),
            jeans.setImage(jeansImage),
            khakis.setImage(khakisImage),
            cargos.setImage(cargosImage)
          ])
        })

}

module.exports = { 
    sync,
    seed,
    db, 
    User, 
    Product, 
    Review, 
    LineItem,
    Order
 };