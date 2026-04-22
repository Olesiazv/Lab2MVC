const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const Book = require('./Book');

class Loan {
  static getAll() {
    return store.loans.map(loan => ({
      ...loan,
      book: Book.getById(loan.bookId)
    }));
  }

  static getById(id) {
    const loan = store.loans.find(loan => loan.id === id);
    if (!loan) return null;

    return {
      ...loan,
      book: Book.getById(loan.bookId)
    };
  }

  static validate(data) {
    const errors = [];

    if (!data.bookId || !Book.getById(data.bookId)) {
      errors.push('Wybierz poprawną książkę.');
    }

    if (!data.borrowerName || data.borrowerName.trim().length < 3) {
      errors.push('Imię i nazwisko wypożyczającego musi mieć co najmniej 3 znaki.');
    }

    if (!data.loanDate) {
      errors.push('Data wypożyczenia jest wymagana.');
    }

    if (!data.returnDate) {
      errors.push('Planowana data zwrotu jest wymagana.');
    }

    if (data.loanDate && data.returnDate && data.returnDate < data.loanDate) {
      errors.push('Data zwrotu nie może być wcześniejsza niż data wypożyczenia.');
    }

    if (!['active', 'returned'].includes(data.status)) {
      errors.push('Status wypożyczenia jest niepoprawny.');
    }

    const activeLoan = store.loans.find(
      loan => loan.bookId === data.bookId && loan.status === 'active' && loan.id !== data.id
    );

    if (activeLoan && data.status === 'active') {
      errors.push('Ta książka jest już aktualnie wypożyczona.');
    }

    return errors;
  }

  static create(data) {
    const newLoan = {
      id: uuidv4(),
      bookId: data.bookId,
      borrowerName: data.borrowerName.trim(),
      loanDate: data.loanDate,
      returnDate: data.returnDate,
      status: data.status
    };

    store.loans.push(newLoan);
    return this.getById(newLoan.id);
  }

  static update(id, data) {
    const loan = store.loans.find(loan => loan.id === id);
    if (!loan) return null;

    loan.bookId = data.bookId;
    loan.borrowerName = data.borrowerName.trim();
    loan.loanDate = data.loanDate;
    loan.returnDate = data.returnDate;
    loan.status = data.status;

    return this.getById(id);
  }

  static delete(id) {
    const index = store.loans.findIndex(loan => loan.id === id);
    if (index === -1) return false;

    store.loans.splice(index, 1);
    return true;
  }
}

module.exports = Loan;
