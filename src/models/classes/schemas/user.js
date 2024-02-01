const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  mail: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    required: true,
  },

})

module.exports = mongoose.model('User', UserSchema)