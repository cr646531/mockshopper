const {db} = require('./db');
const Order = require('./Cart')
const LineItem = require('./LineItem');
const User = require('./User');
const Product = require('./Product');
const Review = require('./Review');


Review.belongsTo(User);
User.hasMany(Review);
Product.hasMany(Review);

Order.hasMany(LineItem);
Order.belongsTo(User)


LineItem.belongsTo(Order);
LineItem.belongsTo(Product)

//I think this is how you do this.
module.exports = db;
