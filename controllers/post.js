
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const computerVisionClient =  require("../middleware/imageAnalizer");
const {Draft,nylas} =  require("../middleware/email");


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
      const objects = (
        await computerVisionClient.analyzeImage(photo.secure_url, {
          visualFeatures: ['Objects'],
        })
      ).objects;
      console.log('objects!!!!', objects);
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
    getEditForm: async (req, res) => {
      try {
   
        const post = await Post.findOne({_id: req.params.id})
        const user = await User.findOne({email: req.oidc.user.email})
        res.render('editPost.ejs', {post: post, user:user})
   
      } catch (error) {
        console.error(error)
      }
    },
    editPost: async (req, res) => {
      const body = req.body
      const photo = await cloudinary.uploader.upload(req.file.path);
      try {
        await Post.findOneAndUpdate({_id: req.params.id}, {
          $set:{
            title:body.title,
            photo:photo.secure_url,
            description:body.description,
            tags:body.tags,
            location:body.location,
            bidTime:body.bidTime,
          }}) 

          res.redirect('/profile')       
      } catch (error) {
        console.error(error)
      }
    },
    deletePost: async (req,res) => {
        try {
          await Post.findOneAndDelete({_id: req.params.id})
          res.redirect('/profile')       
        } catch (error) {
          console.error(error)
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
    },
    getWinner: async (req, res) => {

     

  

      const body = req.body
      const currentPost = await Post.findOne({_id: req.params.id})
      let winUser
      let winnerIndex

      if(currentPost.bids.length > 0) {
        winnerIndex = Math.floor(Math.random() * (currentPost.bids.length - 1))
      }

       winUser = await User.findOne({_id: currentPost.bids[winnerIndex]})

      try {
        console.log('winner index', winnerIndex)
        console.log('winnerId', currentPost.bids[winnerIndex])
        console.log('winnerName', winUser.email)
        await Post.findOneAndUpdate({_id: req.params.id}, {
          $set:{
            winnerId: currentPost.bids[winnerIndex],
            winnerName: winUser.email, //change to name
            isAvailable: false
          }}) 

          const winnerEmail = new Draft(nylas, {
            subject: 'With Love, from Hansel',
            body: `Congratulations you won ${currentPost.title}. Thank you for being part of The Hansel Community! To claim your item contact ${req.oidc.user.nickname} at ${req.oidc.user.email} within 24 hours to finalize pick up details` ,
            to: [{ name: 'Hansel User', email: winUser.email }]
          });

          winnerEmail.send().then(message => {
            console.log(`${message.id} was sent`);
        });    

          res.redirect('/profile')       

      } catch (error) {
        console.error(error)
      }
    }
  }