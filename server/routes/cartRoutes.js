const express = require('express');
const cartRouter = express.Router();
const {Order} = require('../models/Cart')


router.get('/orders', async (req, res, next) => {
  const attr = {
    status: 'CART'
  };
  try {
  let cart = await Order.findOne({ where: attr });
  if(!cart){
    cart = await Order.create(attr);
  }
  const orders = await Order.findAll({
    include: [ LineItem ],
    order: [['createdAt', 'DESC']]
  })
  res.send(orders);
  }
  catch(ex){
    next(ex);
  }
});


module.exports = cartRouter;
