const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
const userCreate = require('./createUser')
const siteList = require('./siteList')
const passwordList = require('./passwordList')
const allPass = require('./allPass')
const note = require('./note')
const port = process.env.port || 4000
console.log(port)

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose');
const mongoPass = process.env.password_mongoDB
const mongoUrl = `mongodb+srv://shahil_kv:${mongoPass}@securepass.ltjt1vx.mongodb.net/securePass`


mongoose.connect(mongoUrl).then(() => {
  console.log("DataBase Connected")
  app.listen(port, () => {
    console.log("port listening to 4000")
  })
}).catch((e) => {
  console.log(e);
})

app.use('/user', userCreate)
app.use('/site', siteList)
app.use('/password', passwordList)
app.use('/every/', allPass)
app.use('/note', note)


// structure of mongoDB database

//DatabaseName in the mongoUrl
// we need to create collection for each of the items like products,carts,users etc..
//then we have the documents like the json file that is called documents thats all


