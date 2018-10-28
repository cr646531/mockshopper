const userRouter = require('express').Router();
const { User } = require('../../models/User');

// load users
userRouter.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// edit user
userRouter.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

// delete user
userRouter.delete('/:userId', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.userId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// create user
userRouter.post('/', (req, res, next) => {
  User.create({ username: req.body.username })
    .then(user => res.send(user))
    .catch(next);
});

module.exports = userRouter;
