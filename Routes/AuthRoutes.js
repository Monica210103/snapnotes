const express = require('express')
const {signup, login} = require('../Controllers/authController')
const router = express.Router()


// to signup
router.post('/signup',signup)

// to login
router.post('/login', login)

module.exports = router