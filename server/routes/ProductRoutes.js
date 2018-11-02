const express = require('express');
const productRouter = express.Router();
const Product = require('../../models/Product.js');
const Review = require('../../models/Review.js')

productRouter.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

productRouter.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

productRouter.get('/with_reviews/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Review }]
  })
    .then(products => res.send(products))
    .catch(next);
});

module.exports = productRouter;
