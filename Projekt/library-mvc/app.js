const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const indexRoutes = require("./routes/index");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const loanRoutes = require("./routes/loanRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/loans", loanRoutes);

app.use((req, res) => {
  res.status(404).render("home", {
    title: "404",
    heroTitle: "Nie znaleziono strony",
    heroText: "Podana strona nie istnieje.",
    is404: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
