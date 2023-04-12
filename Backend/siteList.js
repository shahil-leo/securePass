const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')

// getting details about siteList array
router.get('/siteList/:userId', async (req, res) => {
  const userId = req.params.userId
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const getSitesArray = await userModel.findOne({ _id: userId }, { sites: 1, })
  if (!getSitesArray) return res.status(400).send("Not found the Array")
  res.status(200).send(getSitesArray)
})


//  adding siteList data
router.put('/add/:userId', async (req, res) => {
  const sites = req.body.sites
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const updatedSites = await userModel.updateOne(
    { _id: new ObjectId(req.params.userId) },
    { $push: { sites: sites } })
  if (!updatedSites) return res.status(500).send("Site not added ")
  res.status(200).send(updatedSites)

})

// updating siteList data
router.put('/updateSites/:sitesId/:userId', async (req, res) => {
  const sitesId = req.params.sitesId
  const userId = req.params.userId
  const data = req.body
  console.log({ sitesId, userId, data })
  const updating = await userModel.updateOne(
    { _id: new ObjectId(userId), "sites._id": new ObjectId(sitesId) },
    {
      $set: {
        "sites.$.siteName": data.siteName,
        "sites.$.siteUrl": data.siteUrl,
        "sites.$.siteImgUrl": data.siteImgUrl,
        "sites.$.Category": data.Category
      }
    }
  )
  if (!updating) return res.status(500).send("not updating")
  res.status(200).send(updating)

})

// getting the object based on the id we are adding passwords to the DB
router.get('/siteObject/:id/:userId', async (req, res) => {
  const objId = req.params.id
  const userId = req.params.userId

  const getFullDoc = await userModel.findOne({ _id: userId })
  const sites = await getFullDoc.sites.find(site => site.id === objId)

  if (!getFullDoc) return res.status(400).send("not found the object")
  res.status(200).send(sites)
})
module.exports = router
