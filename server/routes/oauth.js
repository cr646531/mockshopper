const router = require('express').Router()
const passport = require('passport')
const { User } = require('../../models/User')
const { googleClientID, googleClientSecret } = require('../../env')
module.exports = router

//google authentication and login
router.get('/', passport.authenticate('google', {scope: 'email'}))

// handles the callback after Google has authenticated the user (GET /auth/google/callback)
router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/', 
    failureRedirect: '/Login'
  }))

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (token, refreshToken, profile, done) => {
    const info = {
        email: profile.emails[0].value,
        username: profile.displayName,
    }
    console.log(JSON.stringify(profile))
    User.findOrCreate({
        where: { googleId: profile.id },
        defaults: info
    })
    .spread((user) => {
        done(null,user)
    })
    .catch(done)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
});
  
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => done(null, user))
    .catch(done)
  });