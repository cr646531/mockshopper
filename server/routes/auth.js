const router = require('express').Router()
const {User} = require('../../models/User')
module.exports = router

router.use('/google', require('./oauth'))

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.get('/me', (req, res, next) => {
  if (!req.user.id) {
    userNotFound(next)
  } else {
    User.findById(req.user.id)
      .then(user => user ? res.json(user) : userNotFound(next))
      .catch(next)
  }
})

router.delete('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy((err => {
      if(err) return next (err)
      res.status(204).end()
    }))
  })
