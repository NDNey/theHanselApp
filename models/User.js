const mongoose = require('mongoose')
 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
module.exports = mongoose.model("User", userSchema)