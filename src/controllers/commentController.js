const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Validate comment input
const validateComment = [
  body("content", "Comment cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

// Get all comments for a specific post
exports.get_comments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.body.postId })
    .populate({
      path: "user",
      select: "username",
    })
    .exec();

  if (!comments) {
    return res.status(404).json({ message: "No comments found for this post" });
  }
  res.json(comments);
});

// Post a new comment on a post
exports.post_comment = validateComment.concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newComment = new Comment({
      content: req.body.content,
      date: Date.now(),
      user: req.body.userId,
      post: req.body.postId,
    });

    try {
      const comment = await newComment.save();
      res.status(201).json(comment);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to post comment", error: err.message });
    }
  })
);
