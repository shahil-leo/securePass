const router = require('express').Router()
const userModel = require('./userModel')
const bcrypt = require('bcrypt')


router.get('/shahil', (req, res) => {
  res.send('wow shahil you did it')
})

router.post('/register', async (req, res) => {

  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(req.body.password, salt)

  const user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPass
  })

  try {
    const userCreate = await userModel.insertMany(user)
    res.send(userCreate)

  } catch (e) {
    console.log(e);
  }
})

router.post('/login', async (req, res) => {

  const { error } = req.body
  if (error) return res.status(500).send(error[0].message)

  const userByEmail = await userModel.findOne({ email: req.body.email })
  if (!userByEmail) return res.status(500).send('No User found with this email id')

  const hashPassword = await bcrypt.compare(req.body.password, userByEmail.password)
  if (!hashPassword) return res.status(500).send('Password is wrong')
  // res.status(200).send(userByEmail)

})


module.exports = router
