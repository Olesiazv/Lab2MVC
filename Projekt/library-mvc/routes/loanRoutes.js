const express = require("express");
const router = express.Router();
const LoanController = require("../controllers/loanController");

router.get("/", LoanController.index);
router.get("/new", LoanController.createForm);
router.post("/new", LoanController.create);

module.exports = router;
