const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
app.use(express.json());

let books = {
  1: { title: "Things Fall Apart", author: "Chinua Achebe", reviews: {} },
  2: { title: "Fairy tales", author: "Hans Christian Andersen", reviews: {} },
  3: { title: "The Divine Comedy", author: "Dante Alighieri", reviews: {} }
};

let users = [];

app.use(session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

/* TASK 2 – Get all books */
app.get('/', (req, res) => {
  res.send(books);
});

/* TASK 3 – Get book by ISBN */
app.get('/isbn/:isbn', (req, res) => {
  res.send(books[req.params.isbn]);
});

/* TASK 4 – Get books by author */
app.get('/author/:author', (req, res) => {
  const result = Object.values(books).filter(
    book => book.author === req.params.author
  );
  res.send(result);
});

/* TASK 5 – Get books by title */
app.get('/title/:title', (req, res) => {
  const result = Object.values(books).filter(
    book => book.title === req.params.title
  );
  res.send(result);
});

/* TASK 6 – Get reviews */
app.get('/review/:isbn', (req, res) => {
  res.send(books[req.params.isbn].reviews);
});

/* TASK 7 – Register */
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send({ message: "User registered successfully" });
});

/* TASK 8 – Login */
app.post('/login',
