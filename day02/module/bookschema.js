

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookShema = new Schema({
    name: String,
    author: String,
    email: String,
    price: Number,
});

const Book = mongoose.model('book', bookShema);

module.exports = Book;