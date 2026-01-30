const axios = require('axios');

async function getAllBooks() {
  const res = await axios.get('http://localhost:5000/');
  console.log(res.data);
}

async function getBookByISBN(isbn) {
  const res = await axios.get(`http://localhost:5000/isbn/${isbn}`);
  console.log(res.data);
}

async function getBooksByAuthor(author) {
  const res = await axios.get(`http://localhost:5000/author/${author}`);
  console.log(res.data);
}

async function getBooksByTitle(title) {
  const res = await axios.get(`http://localhost:5000/title/${title}`);
  console.log(res.data);
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
