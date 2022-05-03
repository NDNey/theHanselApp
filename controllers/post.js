
const Post = require("../models/Post");

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
            await Post.create({
                title:body.title,
                photo:body.photo,
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