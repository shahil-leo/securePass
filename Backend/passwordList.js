
const router = require('express').Router()
const userModel = require('./userModel')
const { ObjectId } = require('mongodb');
var CryptoJS = require("crypto-js");
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secret_crypto


// * this is something we have to understood clearly because the structure of the document we are saving is nested and nested inside so something complicated so read carefully
// * first what is doing is simple we are finding the which user is logged in then we are getting the sites object which we are logged in
// * next is we are making a array inside a object
// ! structure of the document inside mongoDB understand it why well
// first we have the logged id
//  then we have the sitesArray
//  inside that we have some objects like the sites  objects eg.flip kart , amazon , netflix
//  inside that we are inserting our passwordList array as objects
// ! end
// * then inside that we will use the site.$.passwordList which means that query is automatically our object index using the $ and then we will get the object inside the passwordList we insert our objects of data

//? adding passwordsData includes the id and everything for the passwordList to the passwordList array as object
router.put('/sitePasswordCreate/:id/:userId', async (req, res) => {
  const passwordHash = CryptoJS.AES.encrypt(req.body.password, secretKey).toString()
  const form = {
    email: req.body.email,
    username: req.body.username,
    passwordHint: req.body.passwordHint,
    password: passwordHash
  }
  const objId = req.params.id
  const userId = req.params.userId

  const updatedUser = await userModel.updateOne(
    { _id: new ObjectId(userId), 'sites._id': new ObjectId(objId) },
    { $push: { "sites.$.passwordList": form } }
  );
  if (!updatedUser) res.send("there is no data")
  res.status(200).send(updatedUser)

})

// * we are doing a new method to get the nested object inside two arrays using the filter method to update a object first we will use the filter method
// * provide the id to check which user is logged in then we provide the sites object id and then the passwordList id also
// * and then we call the update method and we know that we will use the set method to update a object inside that
// * this is something tricky because we have a sites array and we will get the index of the object id available  'sites.$[site].passwordList.$[password]': updatedData  this is the line first the site array and the query will find us the index of the sites array object using the id then inside that we have a passwordList array we provide a id and the query will give us the passwordList index and then we will update the object that is our target to update

//? updating the passwords inside the siteList register list
router.put('/siteUpdatePassword/:id/:userId/:sitesId', async (req, res) => {
  const updatedData = req.body
  const userId = req.params.userId
  const id = req.params.id
  const sitesId = req.params.sitesId

  const filter = {
    _id: new ObjectId(userId),
    'sites._id': new ObjectId(sitesId),
    'sites.passwordList._id': new ObjectId(id)
  };

  const update = {
    $set: {
      'sites.$[site].passwordList.$[password]': updatedData
    }
  };

  const options = {
    arrayFilters: [
      { 'site._id': new ObjectId(sitesId) },
      { 'password._id': new ObjectId(id) }
    ]
  };

  const shahil = await userModel.updateOne(filter, update, options);
  res.send(shahil)
})

// ? deleting the object using the simple method using the same filter and this is find one and update
router.delete('/siteDeletePassword/:id/:userId/:sitesId', async (req, res) => {

  const userId = req.params.userId
  const id = req.params.id
  const sitesId = req.params.sitesId


  const filter = { _id: new ObjectId(userId), "sites._id": new ObjectId(sitesId) };
  const update = { $pull: { "sites.$.passwordList": { _id: new ObjectId(id) } } };
  const options = { new: true };

  const result = await userModel.findOneAndUpdate(filter, update, options);
  res.send(result);

})



module.exports = router
