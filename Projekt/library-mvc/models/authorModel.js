const store = require("../data/store");

class AuthorModel {
  static getAll() {
    return [...store.authors].sort((a, b) => a.name.localeCompare(b.name));
  }

  static getById(id) {
    return store.authors.find((author) => author.id === Number(id));
  }

  static create(name) {
    const newAuthor = {
      id: store.authors.length
        ? Math.max(...store.authors.map((a) => a.id)) + 1
        : 1,
      name: String(name).trim()
    };

    store.authors.push(newAuthor);
    return newAuthor;
  }
}

module.exports = AuthorModel;
