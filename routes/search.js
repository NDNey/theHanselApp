const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");
const { requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(), searchController.performSearch);
router.post("/", requiresAuth(), searchController.performSearch);

module.exports = router;
