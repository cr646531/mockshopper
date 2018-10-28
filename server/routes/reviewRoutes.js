const reviewRouter = require('express').Router();
const Review = require('../../models/Review')

reviewRouter.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next)
});

reviewRouter.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.send(review))
    .catch(next)
});

reviewRouter.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(review => res.send(review))
    .catch(next)
});

reviewRouter.delete('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.destroy())
    .then(() => res.status(204))
    .catch(next)
});

reviewRouter.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.status(204).send(review))
});


module.exports = reviewRouter;
