const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET request to get all posts for homepage
router.get("/posts", postController.get_all_posts);

// GET request to get all posts for author page
router.get("/posts/author", postController.get_all_posts_author);

// GET request to get one post details
router.get("/posts/:id", postController.get_post);

// POST request to post a new post
router.post("/posts", postController.post_post);

// PUT request to edit a post
router.put("/posts/:id", postController.edit_post);

// DELETE request to delete a post
router.delete("/posts/:id", postController.delete_post);

module.exports = router;
