const BookModel = require("../models/bookModel");
const AuthorModel = require("../models/authorModel");

class BookController {
  static index(req, res) {
    const { q = "", authorId = "", sort = "" } = req.query;

    res.render("books/index", {
      title: "Książki",
      books: BookModel.filter({ q, authorId, sort }),
      authors: AuthorModel.getAll(),
      filters: { q, authorId, sort }
    });
  }

  static show(req, res) {
    const book = BookModel.getById(req.params.id);

    if (!book) {
      return res.status(404).render("home", {
        title: "404",
        heroTitle: "Nie znaleziono książki",
        heroText: "Wybrana książka nie istnieje.",
        is404: true
      });
    }

    res.render("books/show", {
      title: book.title,
      book
    });
  }

  static createForm(req, res) {
    res.render("books/form", {
      title: "Dodaj książkę",
      book: { title: "", authorId: "", year: "", description: "" },
      authors: AuthorModel.getAll(),
      errors: [],
      formTitle: "Dodaj książkę",
      formAction: "/books/new"
    });
  }

  static create(req, res) {
    const errors = BookModel.validate(req.body);

    if (errors.length) {
      return res.status(400).render("books/form", {
        title: "Dodaj książkę",
        book: req.body,
        authors: AuthorModel.getAll(),
        errors,
        formTitle: "Dodaj książkę",
        formAction: "/books/new"
      });
    }

    BookModel.create(req.body);
    res.redirect("/books");
  }

  static editForm(req, res) {
    const book = BookModel.getById(req.params.id);

    if (!book) {
      return res.redirect("/books");
    }

    res.render("books/form", {
      title: "Edytuj książkę",
      book,
      authors: AuthorModel.getAll(),
      errors: [],
      formTitle: "Edytuj książkę",
      formAction: `/books/${book.id}/edit`
    });
  }

  static update(req, res) {
    const errors = BookModel.validate(req.body);

    if (errors.length) {
      return res.status(400).render("books/form", {
        title: "Edytuj książkę",
        book: { ...req.body, id: Number(req.params.id) },
        authors: AuthorModel.getAll(),
        errors,
        formTitle: "Edytuj książkę",
        formAction: `/books/${req.params.id}/edit`
      });
    }

    BookModel.update(req.params.id, req.body);
    res.redirect("/books");
  }

  static delete(req, res) {
    BookModel.delete(req.params.id);
    res.redirect("/books");
  }
}

module.exports = BookController;