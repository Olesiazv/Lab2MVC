const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

class Author {
  static getAll() {
    return store.authors;
  }

  static getById(id) {
    return store.authors.find(author => author.id === id);
  }

  static validate(data) {
    const errors = [];

    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.push('Imię autora musi mieć co najmniej 2 znaki.');
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      errors.push('Nazwisko autora musi mieć co najmniej 2 znaki.');
    }

    return errors;
  }

  static create(data) {
    const newAuthor = {
      id: uuidv4(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim()
    };

    store.authors.push(newAuthor);
    return newAuthor;
  }

  static update(id, data) {
    const author = this.getById(id);
    if (!author) return null;

    author.firstName = data.firstName.trim();
    author.lastName = data.lastName.trim();
    return author;
  }

  static delete(id) {
    const index = store.authors.findIndex(author => author.id === id);
    if (index === -1) return false;

    const hasBooks = store.books.some(book => book.authorId === id);
    if (hasBooks) {
      return { blocked: true };
    }

    store.authors.splice(index, 1);
    return { blocked: false };
  }

  static getFullName(author) {
    return `${author.firstName} ${author.lastName}`;
  }
}

module.exports = Author;
