
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getPosts: async (req, res) => {
      try {
        const posts = await Post.find()
        const user = await User.findOne({email: req.oidc.user.email})
        res.render('feed.ejs', {posts: posts, user:user})
      }
      catch(err) {
        console.error(err)
      }
    },
    createPost: async (req, res) => {
        const body = req.body
        // console.log("you are posting");
        // console.log(body);

        try {
            // Upload image to cloudinary
      const photo = await cloudinary.uploader.upload(req.file.path);
      // cloudinaryId: photo.public_id,
      // console.log(req.params.id)
            await Post.create({
                title:body.title,
                photo:photo.secure_url,
                description:body.description,
                tags:body.tags,
                location:body.location,
                bidTime:body.bidTime,
                userId:req.params.id

            });
          
            res.redirect('/feed')
          } catch (err) {
             
            console.log(err);
          }
      },
    makeBid: async (req, res) => {
      try {
        
        console.log(req.oidc.user)
        console.log('email',req.oidc.user.email)
        const currentUser = await User.findOne({email: req.oidc.user.email})
        //console.log(currentUser._id)
        const updatedData = await Post.findOne({_id: req.params.id})
        //console.log('updated data', updatedData)
        if(!updatedData.bids.includes(currentUser._id)){
          updatedData.bids.push(currentUser._id)
        }

        await updatedData.save()

        res.redirect('/feed')

      } catch (error) {
        console.error(error)
      }
    }
  }