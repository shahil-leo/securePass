const router = require('express').Router()
const myModel = require('./userModel')
const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb');


router.get('/shahil', (req, res) => {
  res.send('wow shahil you did it')
})

router.post('/register', async (req, res) => {

  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(req.body.password, salt)

  const user = new myModel.userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPass
  })

  // checking the email already existed or not

  const usersDB = await myModel.userModel.find()
  for (let index = 0; index < usersDB.length; index++) {
    const element = usersDB[index];
    if (element.email === req.body.email) return res.status(401).send('Email already existed')
  }

  try {
    const userCreate = await myModel.userModel.insertMany(user)
    res.send(userCreate)
  } catch (e) {
    console.log(e);
  }
})

router.post('/login', async (req, res) => {

  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const userByEmail = await myModel.userModel.findOne({ email: req.body.email })
  if (!userByEmail) return res.status(500).send('User not found with this Email id')

  const hashPassword = await bcrypt.compare(req.body.password, userByEmail.password)
  if (!hashPassword) return res.status(500).send('please enter correct password')
  res.status(200).send(userByEmail)

})

router.put('/add/:userId', async (req, res) => {

  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const updatedSites = await myModel.userModel.updateOne({ _id: new ObjectId(req.params.userId) }, { $push: { site: req.body.sites } })
  if (!updatedSites) return res.status(500).send("why bot")
  res.status(200).send(updatedSites)
})


module.exports = router
