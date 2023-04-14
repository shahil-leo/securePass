const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')


// ? getting all the passwordList of users
router.get('/allPass/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const passwordList = await userModel.aggregate([
    { $match: { _id: new ObjectId(loggedInUserId) } },
    { $project: { _id: new ObjectId(id), sitePasswordList: "$sites" } },
    { $unwind: "$sitePasswordList" },
    { $project: { passwordList: "$sitePasswordList" } }
  ]);
  res.send(passwordList)
})

module.exports = router
