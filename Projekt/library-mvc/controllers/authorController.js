const AuthorModel = require("../models/authorModel");

class AuthorController {
  static index(req, res) {
    res.render("authors/index", {
      title: "Autorzy",
      authors: AuthorModel.getAll(),
      errors: []
    });
  }

  static create(req, res) {
    const name = String(req.body.name || "").trim();

    if (name.length < 3) {
      return res.status(400).render("authors/index", {
        title: "Autorzy",
        authors: AuthorModel.getAll(),
        errors: ["Imię i nazwisko autora musi mieć co najmniej 3 znaki."]
      });
    }

    AuthorModel.create(name);
    res.redirect("/authors");
  }
}

module.exports = AuthorController;
