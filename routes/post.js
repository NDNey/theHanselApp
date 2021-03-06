const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const upload = require("../middleware/multer");

const { useSocket } = require("../middleware/socket");

const { requiresAuth } = require("express-openid-connect");

router.get("/",requiresAuth(), useSocket, postController.getPosts);
router.get("/edit/:id", postController.getEditForm);
router.post("/create/:id", upload.single("photo"), postController.createPost);
router.put("/:id", postController.makeBid);
router.put("/edit/:id", upload.single("photo"), postController.editPost);
router.put("/get-winner/:id", postController.getWinner);
router.delete("/:id", postController.deletePost);

module.exports = router;
