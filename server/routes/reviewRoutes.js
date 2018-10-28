const reviewRouter = require('express').Router();
const Review = require('../../models/Review')

review.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next)
});

review.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.send(review))
    .catch(next)
});

review.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(review => res.send(review))
    .catch(next)
});

review.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.destroy())
    .then(() => res.status(204))
    .catch(next)
});

review.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(204).send(review))
});


module.exports = reviewRouter;
