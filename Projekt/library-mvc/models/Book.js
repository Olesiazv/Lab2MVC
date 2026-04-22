const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const Author = require('./Author');

class Book {
  static getAll(filters = {}) {
    let results = [...store.books];

    if (filters.search) {
      const phrase = filters.search.toLowerCase();
      results = results.filter(book =>
        book.title.toLowerCase().includes(phrase) ||
        book.genre.toLowerCase().includes(phrase) ||
        (book.description || '').toLowerCase().includes(phrase)
      );
    }

    if (filters.authorId) {
      results = results.filter(book => book.authorId === filters.authorId);
    }

    if (filters.sort === 'yearAsc') {
      results.sort((a, b) => a.publicationYear - b.publicationYear);
    }

    if (filters.sort === 'yearDesc') {
      results.sort((a, b) => b.publicationYear - a.publicationYear);
    }

    if (filters.sort === 'titleAsc') {
      results.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
    }

    return results.map(book => this.attachAuthor(book));
  }

  static attachAuthor(book) {
    return {
      ...book,
      author: Author.getById(book.authorId)
    };
  }

  static getById(id) {
    const book = store.books.find(book => book.id === id);
    if (!book) return null;
    return this.attachAuthor(book);
  }

  static validate(data) {
    const errors = [];
    const currentYear = new Date().getFullYear();

    if (!data.title || data.title.trim().length < 2) {
      errors.push('Tytuł musi mieć co najmniej 2 znaki.');
    }

    if (!data.authorId || !Author.getById(data.authorId)) {
      errors.push('Wybierz poprawnego autora.');
    }

    const year = Number(data.publicationYear);
    if (!Number.isInteger(year) || year < 1450 || year > currentYear) {
      errors.push(`Rok wydania musi być liczbą z zakresu 1450-${currentYear}.`);
    }

    if (!data.genre || data.genre.trim().length < 3) {
      errors.push('Gatunek musi mieć co najmniej 3 znaki.');
    }

    if (!data.description || data.description.trim().length < 10) {
      errors.push('Opis musi mieć co najmniej 10 znaków.');
    }

    return errors;
  }

  static create(data) {
    const newBook = {
      id: uuidv4(),
      title: data.title.trim(),
      publicationYear: Number(data.publicationYear),
      authorId: data.authorId,
      genre: data.genre.trim(),
      description: data.description.trim()
    };

    store.books.push(newBook);
    return this.attachAuthor(newBook);
  }

  static update(id, data) {
    const book = store.books.find(book => book.id === id);
    if (!book) return null;

    book.title = data.title.trim();
    book.publicationYear = Number(data.publicationYear);
    book.authorId = data.authorId;
    book.genre = data.genre.trim();
    book.description = data.description.trim();

    return this.attachAuthor(book);
  }

  static delete(id) {
    const activeLoan = store.loans.find(loan => loan.bookId === id && loan.status === 'active');
    if (activeLoan) {
      return { blocked: true };
    }

    const index = store.books.findIndex(book => book.id === id);
    if (index === -1) return { blocked: false, deleted: false };

    store.books.splice(index, 1);
    return { blocked: false, deleted: true };
  }
}

module.exports = Book;
