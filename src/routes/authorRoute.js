const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// GET request to get a user's information when logging in
router.get("/author", authorController.find_author);

// POST request to make a new author
router.post("/author", authorController.new_author);

module.exports = router;
