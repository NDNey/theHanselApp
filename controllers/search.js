const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
    performSearch: async (req, res) => {
      let regex = new RegExp( req.body.search, 'i')
      console.log(regex)
      try {
        const user = await User.findOne({email: req.oidc.user.email})
        const posts = await Post.find({
          $or: [
          {title: regex}, 
          {description: regex}, 
          {tags: regex}
        ]})
  
        res.render('search.ejs', {posts: posts, user:user})
      }
      catch(err) {
        console.error(err)
      }
    }
  
}