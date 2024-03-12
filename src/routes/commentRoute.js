const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../auth/token");

// GET request for getting all comments on a post
router.get("/comments", commentController.get_comments);

// POST request for post a new comment on a post
router.post("/comments", verifyToken, commentController.post_comment);

module.exports = router;
