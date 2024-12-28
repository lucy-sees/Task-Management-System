// src/routes/auth.js
const express = require('express');
const { registerUser, loginUser, confirmEmail, forgotPassword, resetPassword } = require('../controllers/UserController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/confirm-email', confirmEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;