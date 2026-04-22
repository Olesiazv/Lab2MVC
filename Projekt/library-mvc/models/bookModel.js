const store = require("../data/store");
const AuthorModel = require("./authorModel");

class BookModel {
  static getAll() {
    return store.books.map((book) => ({
      ...book,
      author: AuthorModel.getById(book.authorId)
    }));
  }

  static getById(id) {
    const book = store.books.find((item) => item.id === Number(id));
    if (!book) return null;

    return {
      ...book,
      author: AuthorModel.getById(book.authorId)
    };
  }

  static validate(data) {
    const errors = [];

    if (!data.title || String(data.title).trim().length < 2) {
      errors.push("Tytuł musi mieć co najmniej 2 znaki.");
    }

    if (!data.authorId || !AuthorModel.getById(Number(data.authorId))) {
      errors.push("Wybierz poprawnego autora.");
    }

    const year = Number(data.year);
    if (!year || year < 1450 || year > 2100) {
      errors.push("Rok wydania musi być liczbą z zakresu 1450-2100.");
    }

    if (!data.description || String(data.description).trim().length < 10) {
      errors.push("Opis musi mieć co najmniej 10 znaków.");
    }

    return errors;
  }

  static create(data) {
    const newBook = {
      id: store.books.length ? Math.max(...store.books.map((b) => b.id)) + 1 : 1,
      title: String(data.title).trim(),
      authorId: Number(data.authorId),
      year: Number(data.year),
      description: String(data.description).trim()
    };

    store.books.push(newBook);
    return newBook;
  }

  static update(id, data) {
    const index = store.books.findIndex((book) => book.id === Number(id));
    if (index === -1) return null;

    store.books[index] = {
      ...store.books[index],
      title: String(data.title).trim(),
      authorId: Number(data.authorId),
      year: Number(data.year),
      description: String(data.description).trim()
    };

    return store.books[index];
  }

  static delete(id) {
    const index = store.books.findIndex((book) => book.id === Number(id));
    if (index === -1) return false;

    store.books.splice(index, 1);
    return true;
  }

  static filter({ q = "", authorId = "", sort = "" }) {
    let books = this.getAll();

    if (q) {
      const query = q.toLowerCase();
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query) ||
          book.author?.name.toLowerCase().includes(query)
      );
    }

    if (authorId) {
      books = books.filter((book) => book.authorId === Number(authorId));
    }

    if (sort === "title-asc") {
      books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-desc") {
      books.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "year-asc") {
      books.sort((a, b) => a.year - b.year);
    } else if (sort === "year-desc") {
      books.sort((a, b) => b.year - a.year);
    }

    return books;
  }
}

module.exports = BookModel;
