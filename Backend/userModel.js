const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  site: []

})
const userModel = mongoose.model('Users', UserSchema)


const siteSchema = mongoose.Schema({
  siteName: String,
  siteUrl: String,
  siteImgUrl: String,
  Category: String
})
const siteModel = mongoose.model('slee', siteSchema)
module.exports = {
  userModel,
  siteModel
}
