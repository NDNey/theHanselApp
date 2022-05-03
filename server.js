const express = require('express')
const app = express()
const methodOverride = require('method-override')

const connectDB = require('./config/database')
const { auth } = require("express-openid-connect");
const {authConfig} = require('./config/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')

require('dotenv').config({ path: './config/.env'})

connectDB()
app.use(auth(authConfig))

 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', homeRoutes)
app.use('/feed', postRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})