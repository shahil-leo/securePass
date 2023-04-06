const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  sites: []

})
const userModel = mongoose.model('Users', UserSchema)


module.exports = {
  userModel,
}
