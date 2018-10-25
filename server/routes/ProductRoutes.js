let express = require('express');
let router = express.Router();
const { Product } = require('../../models/Products.js');
const { Review } = require('../../models/Review.js')

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/with_reviews/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Review }]
  })
    .then(products => res.send(products))
    .catch(next);
});

module.exports = router;
