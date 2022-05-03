const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const upload = require("../middleware/multer");

router.get('/', postController.getPosts)
router.post('/create', upload.single("photo"), postController.createPost)

module.exports = router