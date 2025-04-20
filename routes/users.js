// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const handleErrorAsync = require('../utils/handleErrorAsync');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/auth/signup', handleErrorAsync(userController.postSignUp));
router.get('/list', handleErrorAsync(userController.getUserList));
router.post('/auth/login', handleErrorAsync(userController.postLogin));
router.get('/profile', authMiddleware, handleErrorAsync(userController.getUserProfile));

module.exports = router;
