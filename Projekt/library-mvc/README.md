# System zarządzania cyfrową biblioteką

## Spis treści
1. Opis projektu  
2. Technologie  
3. Funkcjonalności  
4. Architektura MVC  
5. Struktura projektu  
6. Uruchomienie  
7. Docker  
8. Testy  
9. Dane przykładowe  
10. Autor  

---

## 1. Opis projektu
Projekt to prosta aplikacja internetowa do zarządzania biblioteką.  
Pozwala na dodawanie książek, edycję, usuwanie oraz przeglądanie ich listy.

Dodatkowo w projekcie zostały dodane modele autorów oraz wypożyczeń, dzięki czemu można zobaczyć kto wypożyczył książkę i czy jest ona dostępna.

Aplikacja została wykonana w architekturze MVC.

---

## 2. Technologie
W projekcie zostały użyte:
- Node.js  
- Express  
- EJS  
- CSS  
- JavaScript  
- Docker  

---

## 3. Funkcjonalności
Aplikacja umożliwia:
- wyświetlanie listy książek  
- dodawanie książek  
- edycję książek  
- usuwanie książek  
- podgląd szczegółów książki  
- dodawanie autorów  
- przeglądanie autorów  
- dodawanie wypożyczeń  
- przeglądanie wypożyczeń  
- filtrowanie i wyszukiwanie książek  
- walidację formularzy po stronie klienta i serwera  

---

## 4. Architektura MVC

### Model
Modele odpowiadają za przechowywanie danych i walidację:
- BookModel  
- AuthorModel  
- LoanModel  

### View
Widoki zostały wykonane przy użyciu EJS i odpowiadają za wygląd aplikacji.

### Controller
Kontrolery obsługują żądania HTTP i przekazują dane między modelami a widokami.

## 5. Struktura projektu
app.js
controllers/
models/
routes/
views/
public/
data/
tests/
```

## 6. Uruchomienie

### Wymagania
- Node.js  
- npm  

### Instalacja

npm install


### Uruchomienie

npm start


Aplikacja działa pod adresem:

http://localhost:3000


---

## 7. Docker
Aby uruchomić projekt w Dockerze:

docker compose up --build


---

## 8. Testy
Aby uruchomić testy:

npm test


---

## 9. Dane przykładowe
Dane znajdują się w pliku:

data/store.js


Projekt zawiera przykładowe książki:
- Seria „Diabeł ubiera się u Prady”  
- Jak odkryć własne morderstwo  
- Siedem mężów Evelyn Hugo  
- Poradnik zabójstwa dla grzecznej dziewczynki  
- Służąca  
- Tysiąc pamiętnych pocałunków  

---

## 10. Autor
Projekt wykonała: Olesia Zavhorodnia 52468

---

