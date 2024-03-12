const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../auth/token");

// GET request to get a user's information when logging in
router.get("/user", userController.find_user);

// GET request to attempt to automatically re-login using JWT
router.get("/user-re-login", verifyToken, userController.re_login_user);

// POST request to make a new user when signing up
router.post("/user", userController.new_user);

module.exports = router;
