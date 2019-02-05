const express = require('express');
const lineItemRouter = express.Router();
const LineItem = require('../models/LineItem.js');

lineItemRouter.get('/', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

lineItemRouter.delete('/:lineItemId/order/:orderId', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.lineItemId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

lineItemRouter.put('/:lineItemId/order/:orderId', (req, res, next) => {
  LineItem.findByPk(req.params.lineItemId)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

lineItemRouter.post('/order/', (req, res, next) => {
  LineItem.create({
    orderId: req.body.orderId,
    quantity: req.body.quantity,
    productId: req.body.productId
  })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

module.exports = lineItemRouter;
