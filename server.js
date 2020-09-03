const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = express.Router();
const PORT = 4000;

let Book = require('./book.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/books', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// Add books endpoints
bookRoutes.route('/').get(function(req, res) {
  Book.find(function(err, books) {
      if (err) {
          console.log(err);
      } else {
          res.json(books);
      }
  });
});

bookRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Book.findById(id, function(err, book) {
      res.json(book);
  });
});

bookRoutes.route('/add').post(function(req, res) {
  let book = new Book(req.body);
  book.save()
      .then(book => {
          res.status(200).json({'book': 'book added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new book failed');
      });
});

bookRoutes.route('/update/:id').post(function(req, res) {
  Book.findById(req.params.id, function(err, book) {
      if (!book)
          res.status(404).send("data is not found");
      else
          book.book_title = req.body.book_title;
          book.book_author = req.body.book_author;
          book.book_description = req.body.book_description;
          book.book_completed = req.body.book_completed;

          book.save().then(book => {
              res.json('Book updated!');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });

  app.use('/books', bookRoutes);


});