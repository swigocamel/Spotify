// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/auth/signup', userController.postSignUp);

module.exports = router;
