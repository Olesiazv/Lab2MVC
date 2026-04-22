const LoanModel = require("../models/loanModel");
const BookModel = require("../models/bookModel");

class LoanController {
  static index(req, res) {
    res.render("loans/index", {
      title: "Wypożyczenia",
      loans: LoanModel.getAll()
    });
  }

  static createForm(req, res) {
    res.render("loans/form", {
      title: "Dodaj wypożyczenie",
      loan: {
        bookId: "",
        borrower: "",
        loanDate: "",
        returnDate: "",
        status: "active"
      },
      books: BookModel.getAll(),
      errors: []
    });
  }

  static create(req, res) {
    const errors = LoanModel.validate(req.body);

    if (errors.length) {
      return res.status(400).render("loans/form", {
        title: "Dodaj wypożyczenie",
        loan: req.body,
        books: BookModel.getAll(),
        errors
      });
    }

    LoanModel.create(req.body);
    res.redirect("/loans");
  }
}

module.exports = LoanController;
