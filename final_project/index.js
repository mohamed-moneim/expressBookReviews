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
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  let token = jwt.sign({ username }, "secret");
  req.session.authorization = { token };
  res.send({ message: "Login successful", token });
});

/* Middleware */
const authenticate = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

/* TASK 9 – Add / Modify review */
app.put('/review/:isbn', authenticate, (req, res) => {
  books[req.params.isbn].reviews[req.user.username] = req.body.review;
  res.send({ message: "Review added/updated", reviews: books[req.params.isbn].reviews });
});

/* TASK 10 – Delete review */
app.delete('/review/:isbn', authenticate, (req, res) => {
  delete books[req.params.isbn].reviews[req.user.username];
  res.send({ message: "Review deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
