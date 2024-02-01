const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/classes/schemas/user')
const HttpsProxyAgent = require('https-proxy-agent');
const { keys } = require('../keys')
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.CALLBACK_URL,
      },
      whenAUserArrives
    )
  )
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret",
      },
      async (jwtPayload, done) => {
        try {
          done(null, jwtPayload.user)
        } catch (error) {
          console.error(error);
          done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

const whenAUserArrives = async (_accessToken, _refreshToken, profile, done) => {
  const admin = profile.id === keys.ADMIN_ID;

  const newUser = {
    googleId: profile.id,
    mail: profile._json.email,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    admin: admin
  }

  try {
    let user = await User.findOne({ mail: profile._json.email })

    if (user) {
      done(null, user)
    } else {
      user = await User.create(newUser)
      done(null, user)
    }
  } catch (err) {
    done("Error", null)
  }
}