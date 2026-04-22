module.exports = {
  authors: [
    { id: 1, name: "Lauren Weisberger" },
    { id: 2, name: "Kristen Perrin" },
    { id: 3, name: "Taylor Jenkins Reid" },
    { id: 4, name: "Holly Jackson" },
    { id: 5, name: "Freida McFadden" },
    { id: 6, name: "Tillie Cole" }
  ],
  books: [
    {
      id: 1,
      title: "Seria „Diabeł ubiera się u Prady”",
      authorId: 1,
      year: 2003,
      description:
        "Zabawna i błyskotliwa historia o świecie mody, wielkich ambicjach i bardzo wymagającej pracy."
    },
    {
      id: 2,
      title: "Jak odkryć własne morderstwo",
      authorId: 2,
      year: 2024,
      description:
        "Wciągająca historia, w której bohaterka próbuje zapobiec zbrodni przepowiedzianej wiele lat wcześniej."
    },
    {
      id: 3,
      title: "Siedem mężów Evelyn Hugo",
      authorId: 3,
      year: 2017,
      description:
        "Poruszająca opowieść o legendzie Hollywood, jej sekretach, miłościach i cenie sławy."
    },
    {
      id: 4,
      title: "Poradnik zabójstwa dla grzecznej dziewczynki",
      authorId: 4,
      year: 2019,
      description:
        "Młoda dziewczyna bada dawną sprawę morderstwa i odkrywa niebezpieczne sekrety małego miasteczka."
    },
    {
      id: 5,
      title: "Służąca",
      authorId: 5,
      year: 2022,
      description:
        "Thriller psychologiczny o kobiecie pracującej w bogatym domu, w którym nic nie jest takie, jak się wydaje."
    },
    {
      id: 6,
      title: "Tysiąc pamiętnych pocałunków",
      authorId: 6,
      year: 2016,
      description:
        "Wzruszająca historia o miłości, obietnicach i wspomnieniach, które potrafią zmienić całe życie."
    }
  ],
  loans: [
    {
      id: 1,
      bookId: 3,
      borrower: "Anna Kowalska",
      loanDate: "2025-04-01",
      returnDate: "",
      status: "active"
    }
  ]
};
