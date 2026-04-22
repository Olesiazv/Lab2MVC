const store = require("../data/store");
const BookModel = require("./bookModel");

class LoanModel {
  static getAll() {
    return store.loans.map((loan) => ({
      ...loan,
      book: BookModel.getById(loan.bookId)
    }));
  }

  static validate(data) {
    const errors = [];

    if (!data.bookId || !BookModel.getById(Number(data.bookId))) {
      errors.push("Wybierz poprawną książkę.");
    }

    if (!data.borrower || String(data.borrower).trim().length < 3) {
      errors.push("Imię i nazwisko wypożyczającego musi mieć co najmniej 3 znaki.");
    }

    if (!data.loanDate) {
      errors.push("Data wypożyczenia jest wymagana.");
    }

    if (!["active", "returned"].includes(data.status)) {
      errors.push("Status musi być active albo returned.");
    }

    const existingActiveLoan = store.loans.find(
      (loan) =>
        loan.bookId === Number(data.bookId) &&
        loan.status === "active" &&
        Number(data.id || 0) !== loan.id
    );

    if (existingActiveLoan && data.status === "active") {
      errors.push("Ta książka jest już aktualnie wypożyczona.");
    }

    return errors;
  }

  static create(data) {
    const newLoan = {
      id: store.loans.length ? Math.max(...store.loans.map((l) => l.id)) + 1 : 1,
      bookId: Number(data.bookId),
      borrower: String(data.borrower).trim(),
      loanDate: data.loanDate,
      returnDate: data.returnDate || "",
      status: data.status
    };

    store.loans.push(newLoan);
    return newLoan;
  }
}

module.exports = LoanModel;
