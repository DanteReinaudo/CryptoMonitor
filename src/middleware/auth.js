const { keys } = require('../keys');
const jwt = require("jsonwebtoken");

module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        if (req.user.mail === keys.ADMIN_EMAIL) {
            res.redirect('/admin'); 
        } else {
          res.redirect('/home')
        } 
      }
    },

    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/home');
      }
    },

    ensureAuthAdmin: function (req, res, next) {
       try{
          const token = jwt.verify(req.cookies.token, "secret");
          if (token && token.user.admin) {
              return next()
          } else {
            res.redirect('/home'); 
          }
       } catch {
        res.redirect('/'); 
       }
    },

    ensureAuthNotAdmin: function (req, res, next) {
      try{
          const token = jwt.verify(req.cookies.token, "secret");
          if (token && !token.user.admin) {
              return next()
          } else {
            res.redirect('/admin'); 
          }
       } catch {
        res.redirect('/'); 
       }
    },
    
  }