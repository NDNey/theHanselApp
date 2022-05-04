
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
    getPosts: async (req, res) => {

      try {
        const user = await User.findOne({email: req.oidc.user.email})
        const posts = await Post.find({userId: user._id})
  
        res.render('profile.ejs', {posts: posts, user:user})
      }
      catch(err) {
        console.error(err)
      }
    }
  
}
//<% if(post.userId == ) {%>