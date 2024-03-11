const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Get all post for homepage
exports.get_all_posts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ published: true }).exec();

  res.json(posts);
});

// Get specific post for post page
exports.get_post = asyncHandler(async (req, res) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.id).exec(),
    Comment.find({ post: req.params.id }).exec(),
  ]);

  res.json({ post, comments });
});

// Post a post
exports.post_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Need a title")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Need content")
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        await newPost.save();
        res.json(req.body);
      } catch (err) {
        res.json(err.message);
      }
    }
  }),
];
