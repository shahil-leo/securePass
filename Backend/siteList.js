const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')


//** this is the query used to get all the things in a array we use the get method
// * then we use the query of the first id then using that we get which user has logged in
// * then we do findOne which returns the first matching element in the object and here our sites is the array which return
// * the array contains all the objects like   the sites object each flipKart amazon everything is a object stored in a array

// ?getting details about siteList array
router.get('/siteList/:userId', async (req, res) => {
  const userId = req.params.userId
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const getSitesArray = await userModel.findOne({ _id: new ObjectId(userId) }, { sites: 1, })
  if (!getSitesArray) return res.status(400).send("Not found the Array")
  res.status(200).send(getSitesArray)
})

// * in this next method we are using is put we want to put the object inside the sites array which is we are doing here
// * then we have to do next is inserting a our document inside a array
// * first we will find the id of the logged user then we will use the push method to insert into a array called sites

//?  adding siteList into site array stores as object
router.put('/add/:userId', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const sites = req.body.sites
  const updatedSites = await userModel.updateOne(
    { _id: new ObjectId(req.params.userId) },
    { $push: { sites: sites } })
  if (!updatedSites) return res.status(500).send("Site not added ")
  res.status(200).send(updatedSites)

})

// *Ths is the next method we are updating the siteObj using the put and the before we use the put method to insert but for updating we will use the $set it will update the existing details in the object
// * we are finding the users id first then we know which user is there logged in then we will find the object inside the sites using the id we will get the object that we want to update
// * then we will do set the sites array and index will be given by the query thats way we use the $ dollar sign inside that then we will get the object using the index and then we have the siteName and other properties inside that simply we will update by calling the method

// updating siteList data
router.put('/updateSites/:sitesId/:userId', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const sitesId = req.params.sitesId
  const userId = req.params.userId
  const data = req.body
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

//* the step is simple first we will find the clicked site using the mapping
// * first finding the user next is we will get the sites array then we do the mapping and everyObj id matches our clicked id if any of them matched then we got the object as simple as that

// ? we are using this method because we are first finding every object inside the sites array we only need the clicked sites details and its id that's way we are using the one
router.get('/siteObject/:id/:userId', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const objId = req.params.id
  const userId = req.params.userId

  const getFullDoc = await userModel.findOne({ _id: userId })
  const sites = await getFullDoc.sites.find(site => site.id === objId)

  if (!getFullDoc) return res.status(400).send("not found the object")
  res.status(200).send(sites)
})

// * in this method also we are using the similiar method once any method that matches the same id as the sites then we can delete

// ? this is the method we are using the delete the site one by one
router.delete('/siteDelete/:id/:userId', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const userId = req.params.userId

  const deleted = await userModel.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { sites: { _id: new ObjectId(id) } } }
  )

  if (!deleted) return res.status(500).send("Not deleted")
  res.status(200).send(deleted)

})

module.exports = router
