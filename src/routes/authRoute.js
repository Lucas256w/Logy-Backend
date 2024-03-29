const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");
const verifyToken = require("../auth/token");

// POST request for user login
router.post("/login", userController.find_user);

// GET request to attempt to automatically re-login using JWT
router.get("/re-login", verifyToken, userController.re_login_user);

// POST request for user signup
router.post("/signup", userController.new_user);

module.exports = router;
