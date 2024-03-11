const Author = require("../models/author");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Function to validate input fields
const validate = (method) => {
  switch (method) {
    case "find_author": {
      return [
        body("username", "Username is required").escape().notEmpty(),
        body("password", "Password is required").escape().notEmpty(),
      ];
    }
    case "new_author": {
      return [
        body("name", "name must be at least 4 characters long")
          .trim()
          .isLength({ min: 4 })
          .escape(),
        body("username", "Username must be at least 4 characters long")
          .trim()
          .isLength({ min: 4 })
          .escape(),
        body("password", "Password must be at least 8 characters long")
          .trim()
          .isLength({ min: 8 })
          .escape(),
        body("confirmPassword", "Confirm Password does not match password")
          .trim()
          .custom((value, { req }) => value === req.body.password)
          .escape(),
      ];
    }
  }
};

// Login handler
exports.find_author = validate("find_author").concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const author = await Author.findOne({ username: req.body.username }).exec();
    if (!author) {
      return res.status(401).json({ message: "Login failed: User not found." });
    }

    const match = await bcrypt.compare(req.body.password, author.password);
    if (match) {
      // You can add token generation logic here if you're using JWT for authentication
      return res.json({ message: "Login successful", author });
    } else {
      return res
        .status(401)
        .json({ message: "Login failed: Incorrect password." });
    }
  })
);

// Sign up handler
exports.new_author = validate("new_author").concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const authorExist = await Author.findOne({
      username: req.body.username,
    }).exec();

    if (authorExist) {
      return res.status(401).json({ message: "Username taken" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAuthor = new Author({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    try {
      const author = await newAuthor.save();
      res.json({ message: "User created successfully", author });
    } catch (error) {
      // Handle errors like duplicate username/email
      res.status(500).json({
        message: "An error occurred while creating the user.",
        error: error.message,
      });
    }
  })
);
