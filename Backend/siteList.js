const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')
// updating or adding siteList data
router.put('/add/:userId', async (req, res) => {
  const sites = req.body.sites
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const updatedSites = await userModel.updateOne(
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

  const getSitesArray = await userModel.findOne({ _id: userId }, { sites: 1, })
  if (!getSitesArray) return res.status(400).send("Not found the Array")
  res.status(200).send(getSitesArray)
})

// getting the object based on the id we are adding passwords to the DB
router.get('/siteObject/:id/:userId', async (req, res) => {
  const objId = req.params.id
  const userId = req.params.userId

  const getObject = await userModel.findOne({ _id: userId })
  const sites = await getObject.sites.find(site => site.id === objId)

  if (!getObject) return res.status(400).send("not found the object")
  res.status(200).send(sites)
})

module.exports = router
