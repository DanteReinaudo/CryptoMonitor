const express = require('express')
const passport = require('passport')
const jwt = require("jsonwebtoken")
const router = express.Router()
const { keys } = require('../keys');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    jwt.sign({
      user: req.user,
    },"secret", { expiresIn: "1h" }, 
    (err, token) => {
      if (err) {
        res.locals.token = null;
        return next();
      }
      res.cookie('token', token, { expires: new Date(Date.now() + (15*24*60*60*1000)) })
      return next();
    })

  },
  (req, res, next) => {
    if (req.user.mail === keys.ADMIN_EMAIL) {
      res.redirect('/admin'); 
    } else {
      res.redirect('/home');
    }
  }
)

router.get('/logout', (req, res, next) => {
    req.logout()
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router