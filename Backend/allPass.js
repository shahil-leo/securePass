const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')


// ? getting all the passwordList of users
router.get('/allPass/:id', async (req, res) => {
  const id = req.params.id
  const passwordList = await userModel.aggregate([
    { $project: { _id: new ObjectId(id), sitePasswordList: "$sites.passwordList" } },
    { $unwind: "$sitePasswordList" },
    { $project: { passwordList: "$sitePasswordList" } }
  ]);
  res.send(passwordList)
})

module.exports = router
