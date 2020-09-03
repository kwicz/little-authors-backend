const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    book_title: {
        type: String
    },
    book_author: {
        type: String
    },
    book_description: {
        type: String
    },
    book_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Book', Book);