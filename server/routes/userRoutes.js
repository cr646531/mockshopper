const router = require('express').Router();
const User = require('../../models/User');

// load users
router.get('/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

// edit user
router.put('/users/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

// delete user
router.delete('/users/:userId', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.userId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// create user
router.post('/users/', (req, res, next) => {
  User.create({ username: req.body.username })
    .then(user => res.send(user))
    .catch(next);
});

module.exports = router;
