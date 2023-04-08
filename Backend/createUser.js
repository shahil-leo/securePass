const router = require('express').Router()
const userModel = require('./userModel')
const bcrypt = require('bcrypt')




router.post('/register', async (req, res) => {

  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(req.body.password, salt)

  //Data from the usersDB
  const user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPass
  })
  // checking the email already existed or not

  const usersDB = await userModel.find()
  for (let index = 0; index < usersDB.length; index++) {
    const element = usersDB[index];
    if (element.email === req.body.email) return res.status(401).send('Email already existed')
  }

  try {
    const userCreate = await userModel.insertMany(user)
    res.send(userCreate)
  } catch (e) {
    res.status(400).send('Cannot create user')
  }
})

router.post('/login', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const userByEmail = await userModel.findOne({ email: req.body.email })
  if (!userByEmail) return res.status(500).send('User not found with this Email id')

  const hashPassword = await bcrypt.compare(req.body.password, userByEmail.password)
  if (!hashPassword) return res.status(500).send('please enter correct password')
  res.status(200).send(userByEmail)

})


module.exports = router



