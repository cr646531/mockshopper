const express = require('express');
const cartRouter = express.Router();

const Order = require('../../models/Cart');
const LineItem = require('../../models/LineItem');

cartRouter.get('/orders/', async (req, res, next) => {
  const attr = {
    status: 'CART',
    userId: req.body.loggedInUser ? req.body.loggedInUser.id : null
  };
  try {
    let cart = await Order.findOne({ where: attr });
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

cartRouter.post('/update_id', async (req, res, next) => {
  const attr = {
    status: 'CART',
    userId: req.body.id
  };
  try {
    let cart = await Order.findOne({ where: attr });
    if (!cart) {
      cart = await Order.create(attr);
      
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = cartRouter;
