const express = require('express')
const { singIn, singUp } = require('../controller/libraryController')
const router = express.Router()

router.post('/registerLibrary' , singUp)
router.post('/log-in' , singIn)
module.exports = router