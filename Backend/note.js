const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')

// adding notes to db
router.put('/note-add/:id', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const note = req.body
  console.log({ id, note })
  const noteAdd = await userModel.updateOne(
    { _id: new ObjectId(id) },
    { $push: { note: note } }
  )
  if (!noteAdd) return res.status(500).send("not added")
  res.status(200).send(note)
})

//getting notes from db
router.get('/note-get/:id', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const getNotes = await userModel.findOne({ _id: new ObjectId(id) }, { note: 1 })
  if (!getNotes) return res.status(400).send("Not found the Array")
  res.status(200).send(getNotes)
})






module.exports = router
