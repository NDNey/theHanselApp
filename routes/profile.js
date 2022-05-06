const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { requiresAuth } = require("express-openid-connect");

router.get("/",requiresAuth(), profileController.getPosts);

module.exports = router;
