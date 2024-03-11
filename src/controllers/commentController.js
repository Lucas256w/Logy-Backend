const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Get all comments for a blog
exports.get_comments = asyncHandler(async (req, res) => {
  const comments = Comment.find({ post: req.postId }).exec();

  res.json(comments);
});

exports.post_comment = [
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Cannot be empty")
    .escapee(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const comment = new Comment({
      content: req.body.content,
      user: req.body.userId,
      post: req.body.postId,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      await message.save();

      res.json(req.body);
    }
  }),
];
