const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    password:{
        type: String,
        require: true
    },

    books:[{
        type: mongoose.Schema.ObjectId,
        ref: 'book',
        required: true
    }]
});

const libraryModel = mongoose.model('library', librarySchema)

module.exports = libraryModel