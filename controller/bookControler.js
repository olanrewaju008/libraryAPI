const express = require('express')
const bookModel = require('../models/bookModel')
const libraryModel = require('../models/libraryModel')

exports.addBook = async (req, res) => {
    try {
        const {libraryId} = req.params
        const{
            title,
            author,
            publicationDate,
            availability
        } = req.body

        if(!title || !author || !publicationDate || !availability){
            return res.status(400).json({
                message: 'please fill in the missing field(s)'
            })
        }
        const library = await libraryModel.findById(libraryId)
        if(!library){
            return res.status(404).json({
                message: 'library not found'
            })
        }
        const newBook = new bookModel({
            title,
            author,
            publicationDate,
            availability,
            library: libraryId
        })

        await newBook.save()
        library.books.push(newBook)
        await library.save()
        res.status(201).json({
            message: 'book succesfully added',
            newBook
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.borrowBook = async (req, res) => {
    try {
        const { libraryId, bookId } = req.params;
        const userId = req.user.id;

        const library = await libraryModel.findById(libraryId);
        if (!library) {
            return res.status(404).json({
                message: 'Library not found'
            });
        }

        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        if (!book.availability) {
            return res.status(400).json({
                message: 'Book is currently not available'
            });
        } else {
            
            book.availability = false;
            book.borrowedBy = userId;  
            book.borrowedDate = new Date();
            book.dueDate = new Date(new Date().setDate(new Date().getDate() + 14));
            await book.save();

            const borrowedBook = new borrowedBook({
                bookId: bookId,
                userId: userId
            });
            await borrowedBook.save();

            res.json({
                message: 'Book borrowed successfully',
                book
            });
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;

        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        if (book.borrowedBy.toString() !== userId.toString()) {
            return res.status(400).json({
                message: 'You cannot return a book you did not borrow'
            });
        }

        book.availability = true;
        book.borrowedBy = null;
        book.borrowedDate = null; 
        book.dueDate = null;
        await book.save();

        const borrowedBook = await bookModel.findOne({ bookId, userId, isReturned: false });
        if (borrowedBook) {
            borrowedBook.returnedDate = new Date();
            borrowedBook.isReturned = true;
            await borrowedBook.save();
        }

        res.json({
            message: 'Book returned successfully',
            book
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.viewAllBooks = async (req, res) => {
    try {
        const {libraryId} = req.params
        const library = await libraryModel.findById(libraryId)
        if(!library){
            return res.status(400).json({
                message: 'library does not exist'
            })
        }
        const getAllBooks = await bookModel.find({library:libraryId, availability: true })
        res.status(200).json({
            message: 'here are all the available book(s) in this library',
            getAllBooks
        })
    } catch (error) {
        res.status
    }
}