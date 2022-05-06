const express = require('express')
const app = express()
const methodOverride = require('method-override')

const connectDB = require('./config/database')
const { auth } = require("express-openid-connect");
const {authConfig} = require('./config/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')
const profileRoutes = require('./routes/profile')
const searchRoutes = require('./routes/search')
const { requiresAuth } = require("express-openid-connect");

require('dotenv').config({ path: './config/.env'})

connectDB()


 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', homeRoutes)
app.use(auth(authConfig))
app.use('/feed' , postRoutes)
app.use('/profile', profileRoutes)
app.use('/search', searchRoutes)



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})