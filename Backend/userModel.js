const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
})

module.exports = mongoose.model('Users', UserSchema)
