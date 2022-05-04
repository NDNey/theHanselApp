const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const upload = require("../middleware/multer");

router.get('/', postController.getPosts)
router.post('/create/:id', upload.single("photo"), postController.createPost)
router.put('/:id', postController.makeBid)

module.exports = router