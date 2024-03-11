const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Get all posts for homepage
router.get("/posts", postController.get_all_posts);

// Get post details
router.get("/posts/:id", postController.get_post);

// Post a new post
router.post("/posts", postController.post_post);

module.exports = router;
