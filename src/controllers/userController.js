const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Function to validate input fields
const validate = (method) => {
  switch (method) {
    case "find_user": {
      return [
        body("username", "Username is required").escape().notEmpty(),
        body("password", "Password is required").escape().notEmpty(),
      ];
    }
    case "new_user": {
      return [
        body("username", "Username must be at least 4 characters long")
          .trim()
          .isLength({ min: 4 })
          .escape(),
        body("email", "Must be a valid email address")
          .trim()
          .isEmail()
          .normalizeEmail()
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
exports.find_user = validate("find_user").concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({ message: "Login failed: User not found." });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      // You can add token generation logic here if you're using JWT for authentication
      return res.json({ message: "Login successful", user });
    } else {
      return res
        .status(401)
        .json({ message: "Login failed: Incorrect password." });
    }
  })
);

// Sign up handler
exports.new_user = validate("new_user").concat(
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const userExist = await User.findOne({
      username: req.body.username,
    }).exec();

    if (userExist) {
      return res.status(401).json({ message: "Username taken" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    try {
      const user = await newUser.save();
      res.json({ message: "User created successfully", user });
    } catch (error) {
      // Handle errors like duplicate username/email
      res.status(500).json({
        message: "An error occurred while creating the user.",
        error: error.message,
      });
    }
  })
);
