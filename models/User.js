const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  profilePhoto: String, //placeholder for Auth0 photo
  bio: String,
  bidHistory: []
})