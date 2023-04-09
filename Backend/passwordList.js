
const router = require('express').Router()
const userModel = require('./userModel')
const { ObjectId } = require('mongodb');
var CryptoJS = require("crypto-js");
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secret_crypto
const uuid = require('uuid')


// adding passwords to the sites
router.put('/sitePasswordCreate/:id/:userId', async (req, res) => {

  const passwordHash = CryptoJS.AES.encrypt(req.body.password, secretKey).toString()


  const form = {
    id: uuid.v4(),
    email: req.body.email,
    username: req.body.username,
    passwordHint: req.body.passwordHint,
    password: passwordHash
  }

  const objId = req.params.id
  const userId = req.params.userId

  const updatedUser = await userModel.updateOne(
    { _id: new ObjectId(userId), "sites.id": objId },
    { $push: { "sites.$.passwordList": form } }
  );

  if (!updatedUser) res.send("there is no data")
  res.status(200).send(updatedUser)

})

router.put('/siteUpdatePassword/:id/:userId', async (req, res) => {
  const updatedData = req.body
  const userId = req.params.userId
  const id = req.params.id
  console.log(userId);
  console.log(id);
  console.log(updatedData.email);
  const updatedPassword = await userModel.updateOne(
    { _id: new ObjectId(userId), "passwordList.id": id },
    { $set: { "passwordList.$.email": updatedData.email, "passwordList.$.username": updatedData.username } }
  )
  console.log(updatedPassword)
  if (!updatedPassword.acknowledged) {
    res.status(500).send("Not updated")
    return
  }
  res.send(updatedData)
})

router.delete('siteDeletePassword/:id/:userId', async (req, res) => {
  const userId = req.params.userId
  const id = req.params.id
  console.log(id)
  const deletedPass = userModel.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { passwordList: { id: id } } }
  )
  if (!deletedPass) {
    res.status(500).send("Not deleted")
    return
  }
  res.send(deletedPass)
})


module.exports = router
