const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

router.get("/", BookController.index);
router.get("/new", BookController.createForm);
router.post("/new", BookController.create);
router.get("/:id", BookController.show);
router.get("/:id/edit", BookController.editForm);
router.post("/:id/edit", BookController.update);
router.post("/:id/delete", BookController.delete);

module.exports = router;