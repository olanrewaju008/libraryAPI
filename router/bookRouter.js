const express = require('express')
const bookModel = require('../controller/bookControler')
const { addBook, viewAllBooks, borrowBook, returnBook } = require('../controller/bookControler')
const router = express.Router()

router.post('/addBook' , addBook)
router.get('/getAllBook' , viewAllBooks)
router.get('/borrowBook' , borrowBook)
router.post('/returnBook', returnBook)

module.exports = router