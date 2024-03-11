const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET request to get a user's information when logging in
router.get("/user", userController.find_user);

// POST request to make a new user when signing up
router.post("/user", userController.new_user);

module.exports = router;
