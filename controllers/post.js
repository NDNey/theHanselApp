
const Post = require("../models/Post");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getPosts: async (req, res) => {
      try {
        res.render('feed.ejs')
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

            await Post.create({
                title:body.title,
                photo:photo.secure_url,
                description:body.description,
                tags:body.tags,
                location:body.location,
                bidTime:body.bidTime,

            });
            console.log("Post has been created!");
          } catch (err) {
             
            console.log(err);
          }
      }
  }