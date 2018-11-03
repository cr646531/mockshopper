const router = require('express').Router()
const User = require('../models/User')

module.exports = router

router.use('/google', require('./oauth'))


//do we even need this? 
const userNotFound = (next) => {
  const err = new Error('user not signed in')
  err.status = 404
 // next(err)
}

router.get('/me', (req, res, next) => {
  if (!req.user || !req.user.id) { //defensive, not throwing error when not signed in? 
    userNotFound(next)
  } else {
    User.findById(req.user.id)
      .then(user => user ? res.json(user) : userNotFound(next))
      .catch(next)
  }
})

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    if (user) {
      req.login(user, (err) => err ? next(err) : res.json(user))
    } else {
      const err = new Error('Incorrect email or password!')
      err.status = 401
      throw err
    }
  } catch (err) {
    next(err)
  }
})

// router.post('/create_account', async (req, res, next) => {
//   try {
//     const user = await User.create(req.body)
//     req.login(user, err => (err ? next(err) : res.send(user)))
//   } catch (err) {
//       next(err)
//     }
// })


router.delete('/logout', (req, res, next) => {
    req.logout()
    req.session.destroy((err => {
      if(err) return next (err)
      res.status(204).end()
    }))
  })
