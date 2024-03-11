const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Get all comments for a post
exports.get_comments = asyncHandler(async (req, res) => {
  const comments = Comment.find({ post: req.postId }).exec();

  res.json(comments);
});

// Post a comment on a post
exports.post_comment = [
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment can not be empty")
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      content: req.body.content,
      date: Date.now(),
      user: req.body.userId,
      post: req.body.postId,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        await newComment.save();
        res.json(req.body);
      } catch (err) {
        res.json(err.message);
      }
    }
  }),
];
