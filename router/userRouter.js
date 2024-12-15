const express = require('express')
const { singUp, login } = require('../controller/userController')
const router = express.Router()

router.post('/register', singUp)
router.post('/login', login)
module.exports = router