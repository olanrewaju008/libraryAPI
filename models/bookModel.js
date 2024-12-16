const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    publicationDate: {
        type: Date,
        required: true
    },

    availability: {
        type: Boolean,
        default: true
    },

    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'library',
        required: true
    },

    borrowedBy: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User',
        default: null
    },

    borrowedDate: {
        type: Date,
        default: null
    },

    dueDate: {
        type: Date,
        default: null
    }
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;
