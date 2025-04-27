// src/routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const handleErrorAsync = require('../utils/handleErrorAsync');
const authController = require('../controllers/authController');

router.post('/:type/auth/signup', handleErrorAsync(authController.postSignUp));
router.post('/:type/auth/login', handleErrorAsync(userController.postLogin));

module.exports = router;
