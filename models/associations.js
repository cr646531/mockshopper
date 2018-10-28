const {db} = require('/db');
const {Order} = require('/Cart')
const {LineItem} = require('LineItem.js');
const {User} = require('/User');
const {Product} = require('/Products');
const Review = require('/Review');


Review.belongsTo(User);
User.hasMany(Review);
Product.hasMany(Review);
Order.hasMany(LineItem);
LineItem.hasOne(Product);
LineItem.belongsTo(Order);

//I think this is how you do this.
module.exports = db;
