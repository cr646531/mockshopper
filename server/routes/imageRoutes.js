const imageRouter = require('express').Router();
const Image = require('../models/Image')

imageRouter.get('/', (req, res, next) => {
  Image.findAll()
    .then(images => res.send(images))
    .catch(next)
});

imageRouter.post('/', (req, res, next) => {
  Image.create(req.body)
    .then(image => res.send(image))
    .catch(next)
});


module.exports = imageRouter;
