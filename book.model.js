const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    book_title: String,
    book_author: String,
    book_description: String,
    book_completed: Boolean,
    book_pages: [{
        page_text: String,
        page_image: {
            page_image_name: String,
            page_image_data: String
        }
    }]
});

module.exports = mongoose.model('Book', Book);