const test = require("node:test");
const assert = require("node:assert/strict");

const BookModel = require("../models/bookModel");
const LoanModel = require("../models/loanModel");

test("BookModel should return error for invalid title", () => {
  const errors = BookModel.validate({
    title: "",
    authorId: 1,
    year: 2020,
    description: "Poprawny opis książki"
  });

  assert.ok(errors.length > 0);
});

test("BookModel should validate correct book", () => {
  const errors = BookModel.validate({
    title: "Testowa książka",
    authorId: 1,
    year: 2020,
    description: "To jest poprawny opis testowej książki."
  });

  assert.equal(errors.length, 0);
});

test("LoanModel should reject active loan when book is already borrowed", () => {
  const errors = LoanModel.validate({
    bookId: 3,
    borrower: "Jan Kowalski",
    loanDate: "2025-05-01",
    returnDate: "",
    status: "active"
  });

  assert.ok(errors.length > 0);
});
