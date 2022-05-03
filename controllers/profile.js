
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
    getPosts: async (req, res) => {

    const user =  req.oidc.user

      try {
        res.render('profile.ejs',{user})
      }
      catch(err) {
        console.error(err)
      }
    }
  
}