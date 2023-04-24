const router = require('express').Router()
const { ObjectId } = require('mongodb');
const userModel = require('./userModel')

// adding notes to db
router.put('/add/:id', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const note = req.body
  const noteAdd = await userModel.updateOne(
    { _id: new ObjectId(id) },
    { $push: { note: note } }
  )
  if (!noteAdd) return res.status(500).send("not added")
  res.status(200).send(note)
})

//getting notes from db
router.get('/get/:id', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const getNotes = await userModel.findOne({ _id: new ObjectId(id) }, { note: 1 })
  if (!getNotes) return res.status(400).send("Not found the Array")
  res.status(200).send(getNotes)
})

router.put('/update/:userId/:id', async (req, res) => {
  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)
  const id = req.params.id
  const userId = req.params.userId
  const data = req.body
  const updateNotes = await userModel.updateOne(
    { _id: new ObjectId(userId), "note._id": new ObjectId(id) },
    {
      $set: {
        "note.$.heading": data.heading,
        "note.$.sideHeading": data.sideHeading,
        "note.$.paragraph": data.paragraph
      }
    }
  )
  if (!updateNotes) return res.status(500).send("No notes")
  res.status(200).send(updateNotes)
})

router.delete('/delete/:userId/:id', async (req, res) => {
  const id = req.params.id
  const userId = req.params.userId

  const deleteNote = await userModel.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { note: { _id: new ObjectId(id) } } }
  )
  if (!deleteNote) return res.status(500).send("not deleted")
  res.status(200).send(deleteNote)
})



module.exports = router
