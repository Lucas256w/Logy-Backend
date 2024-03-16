const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const verifyAuthorToken = require("../auth/authorToken");

// POST request to get a user's information when logging in
router.post("/author-login", authorController.find_author);

// GET request to attempt to automatically re-login using JWT
router.get(
  "/author-re-login",
  verifyAuthorToken,
  authorController.re_login_author
);

// POST request to make a new author
router.post("/author-new", authorController.new_author);

module.exports = router;
