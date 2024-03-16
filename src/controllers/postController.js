const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const he = require("he");

// Helper function to validate post inputs
const validatePost = [
  body("title", "Need a title").trim().isLength({ min: 1 }).escape(),
  body("content", "Need content").trim().isLength({ min: 1 }).escape(),
];

// Get all published posts for the homepage
exports.get_all_posts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ published: true }).exec();
  const decodedPosts = posts.map((post) => ({
    id: post.id,
    title: he.decode(post.title),
  }));
  res.json(decodedPosts);
});

// Get all posts for an author's page
exports.get_all_posts_author = asyncHandler(async (req, res) => {
  const posts = await Post.find().exec();
  const decodedPosts = posts.map((post) => ({
    id: post.id,
    title: he.decode(post.title),
    published: post.published,
  }));
  res.json(decodedPosts);
});

// Get a specific post for the post page
exports.get_post = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).exec();
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json({
    title: he.decode(post.title),
    content: he.decode(post.content),
    date: post.date_formatted,
    published: post.published,
  });
});

// Create a new post
exports.post_post = validatePost.concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("hello");

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      date: Date.now(),
    });

    try {
      const post = await newPost.save();
      res.status(201).json(post);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create post", error: err.message });
    }
  })
);

// Edit an existing post
exports.edit_post = validatePost.concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
          date: Date.now(),
        },
        { new: true } // Returns the updated document
      );
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to update post", error: err.message });
    }
  })
);

// Delete a post
exports.delete_post = asyncHandler(async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: err.message });
  }
});
