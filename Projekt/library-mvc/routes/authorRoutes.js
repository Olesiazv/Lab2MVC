const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");

router.get("/", AuthorController.index);
router.post("/new", AuthorController.create);

module.exports = router;
