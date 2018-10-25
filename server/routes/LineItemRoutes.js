let express = require('express');
let router = express.Router();
const { LineItem } = require('../models/LineItem.js');

router.get('/', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

router.delete('/:lineItemId/orders/:orderId', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.lineItemId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:lineItemId/orders/:orderId', (req, res, next) => {
  LineItem.findById(req.params.LineItemid)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.post('/order/:orderId', (req, res, next) => {
  LineItem.create({
    orderId: req.params.orderId,
    quantity: req.body.quantity,
    productId: req.body.productId
  })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

module.exports = router



