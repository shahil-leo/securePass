
const router = require('express').Router()
const userModel = require('./userModel')
const { ObjectId } = require('mongodb');
var CryptoJS = require("crypto-js");
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secret_crypto


// adding passwords to the sites
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

router.put('/siteUpdatePassword/:id/:userId/:sitesId', async (req, res) => {
  const updatedData = req.body
  const userId = req.params.userId
  const id = req.params.id
  const sitesId = req.params.sitesId

  // const findUser = await userModel.findOne({ _id: new ObjectId(userId) })
  // let site;
  // let singlePass;
  // for (let i = 0; i < findUser.sites.length; i++) {
  //   if (findUser.sites[i]._id.toString() === sitesId) {
  //     site = findUser.sites[i];
  //     break;
  //   }
  // }
  // for (let index = 0; index < site.passwordList.length; index++) {
  //   if (site.passwordList[index]._id.toString() === id) {
  //     singlePass = site.passwordList[index]
  //     console.log(singlePass)
  //   }
  // }
  // return res.send(singlePass)


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
  console.log(shahil)
  res.send(shahil)



  //   const updatedPassword = await userModel.updateOne(
  //     { _id: new ObjectId(userId) },
  //     {
  //       $addToSet: {
  //         "passwordList.$.email": updatedData.email,
  //         "passwordList.$.username": updatedData.username,
  //         "passwordList.$.passwordHint": updatedData.passwordHint,
  //         "passwordList.$.password": updatedData.password
  //       }
  //     }
  //   );
  //   console.log(updatedPassword)
  //   if (!updatedPassword.acknowledged) {
  //     res.status(500).send("Not updated")
  //     return
  //   }
  //   res.send(updatedData)
  // })

  router.delete('siteDeletePassword/:id/:userId', async (req, res) => {
    const filter = {
      _id: new ObjectId(userId),
      'sites._id': new ObjectId(sitesId)
    };

    const update = {
      $pull: {
        'sites.$[site].passwordList': { _id: new ObjectId(id) }
      }
    };

    const options = {
      arrayFilters: [
        { 'site._id': new ObjectId(sitesId) }
      ]
    };

    const result = await userModel.updateOne(filter, update, options);
    console.log(result);
    res.send(result);
  })
})



module.exports = router
