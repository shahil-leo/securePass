const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  sites: [
    {
      siteName: String,
      siteUrl: String,
      siteImgUrl: String,
      Category: String,
      passwordList: [
        {
          email: String,
          username: String,
          passwordHint: String,
          password: String
        }
      ]
    }
  ],
  note: [
    {
      heading: String,
      sideHeading: String,
      paragraph: String
    }

  ]

})

module.exports = mongoose.model('Users', UserSchema)


