const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Digital Library",
    heroTitle: "Cyfrowa biblioteka",
    heroText:
      "Nowoczesna aplikacja internetowa w stylu mobilnym do zarządzania książkami, autorami i wypożyczeniami.",
    is404: false
  });
});

module.exports = router;
