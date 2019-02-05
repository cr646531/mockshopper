const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product.js');
const Review = require('../models/Review.js')
const Image = require('../models/Image.js');
//debugging

productRouter.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: Image
    }]
  })
    .then(products => res.send(products))
    .catch(next);
});

productRouter.post('/', async (req, res, next) => {

  let { name, description, category, imageData } = req.body;

  if(imageData === ''){
    Product.create({ name: name, description: description, category: category})
      .then(product => res.send(product))
      .catch(next);
  } else {
    const [product, image] = await Promise.all([
      Product.create({ name: name, description: description, category: category}),
      Image.create({ data: imageData })
    ]);
    product.setImage(image);
    res.send(product);
  }
});

productRouter.get('/with_reviews/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Review }]
  })
    .then(products => res.send(products))
    .catch(next);
});

module.exports = productRouter;

