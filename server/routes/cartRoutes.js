const express = require('express');
const cartRouter = express.Router();

const Order = require('../models/Cart');
const LineItem = require('../models/LineItem');

cartRouter.get('/orders/', async (req, res, next) => {
  const attr = {
    status: 'CART'
  };
  try {
    let cart = await Order.findOne(attr);
    if (!cart) {
      cart = await Order.create(attr);
    }
    const orders = await Order.findAll({
      include: [
        {
          model: LineItem
        }
      ],
      order: [['createdAt', 'DESC'], [LineItem, 'createdAt', 'DESC']]
    });
    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});

cartRouter.post('/update_user_id', async (req, res, next) => {
  try {
    if (req.body.id) {
      const attr = {
        status: 'CART',
        userId: req.body.id
      };
      let cart = await Order.findOne({ where: attr });
      if (!cart) {
        cart = await Order.findOne({
          where: {
            status: 'CART'
          }
        });
        cart.update({
          userId: req.body.id
        });
        await Order.create({
          status: 'CART'
        });
      }
    }
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

cartRouter.put('/submit/user/', (req, res, next) => {
  Order.findOne({
    where: {
      status: 'CART',
      userId: req.body.userId ? req.body.userId: null
    }
  })
    .then(cart => cart.update({ status: 'ORDER' }))
    .then(() => Order.create({status: 'CART' ,userId: req.body.userId ? req.body.userId: null}))
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
});

module.exports = cartRouter;










