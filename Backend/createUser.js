const router = require('express').Router()
const myModel = require('./userModel')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb');
var CryptoJS = require("crypto-js");
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secret_crypto


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
// updating or adding siteList data
router.put('/add/:userId', async (req, res) => {
  const sites = req.body.sites
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const updatedSites = await myModel.userModel.updateOne(
    { _id: new ObjectId(req.params.userId) },
    { $push: { sites: sites } })
  if (!updatedSites) return res.status(500).send("Site not added or updated")
  res.status(200).send(updatedSites)

})
// getting details about siteList array
router.get('/siteList/:userId', async (req, res) => {
  const userId = req.params.userId
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const getSitesArray = await myModel.userModel.findOne({ _id: userId }, { sites: 1, })
  if (!getSitesArray) return res.status(400).send("Not found the Array")
  res.status(200).send(getSitesArray)
})


// inside the array site i have object i want to get that

router.get('/siteObject/:id/:userId', async (req, res) => {
  const objId = req.params.id
  const userId = req.params.userId

  const getObject = await myModel.userModel.findOne({ _id: userId })
  const sites = await getObject.sites.find(site => site.id === objId)

  if (!getObject) return res.status(400).send("not found the object")
  res.status(200).send(sites)
})

// adding passwords to the sites
router.put('/sitePasswordCreate/:id/:userId', async (req, res) => {
  console.log(req.body)

  const passwordHash = CryptoJS.AES.encrypt(req.body.password, secretKey).toString()

  const form = {

    email: req.body.email,
    username: req.body.username,
    passwordHint: req.body.passwordHint,
    password: passwordHash
  }
  console.log(form)
  const objId = req.params.id
  const userId = req.params.userId
  const updatedUser = await myModel.userModel.updateOne(
    { _id: new ObjectId(userId), "sites.id": objId },
    { $push: { "sites.$.passwordList": form } }
  );

  if (!updatedUser) res.send("there is no data")
  res.status(200).send(updatedUser)

})


module.exports = router



