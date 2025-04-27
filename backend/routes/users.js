// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const handleErrorAsync = require('../utils/handleErrorAsync');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', handleErrorAsync(userController.getUserList));
router.get('/profile', authMiddleware, handleErrorAsync(userController.getUserProfile));

module.exports = router;
